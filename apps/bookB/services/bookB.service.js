'use strict'

import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

import booksDB from '../book.json' assert { type: 'json' }

const BOOK_KEY = 'bookDB'

_createBooks()

export const bookService = {
  query,
  get,
  remove,
  save,
  getEmptyBook,
  addReview,
  removeRev,
  addGoogleBook,
  prepareData,
}

function query(filterBy = {}) {
  return storageService.query(BOOK_KEY).then((books) => {
    if (filterBy.txt) {
      const regex = new RegExp(filterBy.txt, 'i')
      books = books.filter((book) => regex.test(book.title))
    }
    // if (filterBy.amount) {
    //   books = books.filter(book => book.amount >= filterBy.amount)
    // }
    return books
  })
}

function get(bookId) {
  return storageService.get(BOOK_KEY, bookId).then(_setNextPrevBookId)
}

function remove(bookId) {
  return storageService.remove(BOOK_KEY, bookId)
}
function removeRev(bookId, reviewId) {
  return get(bookId).then((book) => {
    const idx = book.reviews.findIndex((review) => review.id === reviewId)
    book.reviews.splice(idx, 1)
    return save(book)
  })
}

function save(book) {
  if (book.id) {
    return storageService.put(BOOK_KEY, book)
  } else {
    return storageService.post(BOOK_KEY, book)
  }
}

function getEmptyBook(title = '', amount = 0) {
  return { id: '', title, listPrice: amount }
}

function _createBooks() {
  let books = utilService.loadFromStorage(BOOK_KEY)
  if (!books || !books.length) {
    books = booksDB
    utilService.saveToStorage(BOOK_KEY, books)
  }
}

function _createBook(title, amount = 250) {
  const book = getEmptyBook(title, amount)
  book.id = utilService.makeId()
  return book
}

function addReview(bookId, review) {
  review.id = utilService.makeId()
  storageService.get(BOOK_KEY, bookId).then((book) => {
    if (!book.reviews) book.reviews = []
    book.reviews.push(review)
    save(book)
  })
}

function _setNextPrevBookId(book) {
  return storageService.query(BOOK_KEY).then((books) => {
    const bookIdx = books.findIndex((currBook) => currBook.id === book.id)
    book.nextBookId = books[bookIdx + 1] ? books[bookIdx + 1].id : books[0].id
    book.prevBookId = books[bookIdx - 1]
      ? books[bookIdx - 1].id
      : books[books.length - 1].id
    return book
  })
}

function addGoogleBook(item) {
  // item = prepareData(item)
  return storageService.query(BOOK_KEY).then((books) => {
    const bookIdx = books.findIndex((currBook) => currBook.title === item.title)
    if (bookIdx < 0) {
      return storageService.post(BOOK_KEY, item)
    }
  })
}

function prepareData(item) {
  const newBook = {
    id: item.id,
    title: item.volumeInfo.title,
    subtitle: item.volumeInfo.subtitle,
    authors: item.volumeInfo.authors,
    publishedDate: item.volumeInfo.publishedDate,
    pageCount: item.volumeInfo.pageCount,
    categories: item.volumeInfo.categories,
    thumbnail: item.volumeInfo.imageLinks.thumbnail,
    language: item.volumeInfo.language,
    listPrice: {
      amount: utilService.getRandomIntInclusive(),
      currencyCode: 'USD',
      isOnSale: true,
    },
  }
  console.log(newBook)
  return newBook
}
