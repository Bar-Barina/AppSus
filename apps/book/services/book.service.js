'use strict'

import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

import booksDB from '../books.json' assert {type: "json"}

const BOOK_KEY = 'booksDB'

export const bookService = {
    query,
    get,
    remove,
    save,
    getEmptyBook,
    addReview,
    addGoogleBook
}

makeData()

function makeData() {
    if (!utilService.loadFromStorage(BOOK_KEY)) utilService.saveToStorage(BOOK_KEY, booksDB)
    else return
}

function query(filterBy = {}) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            if (filterBy.txt) {
                const regex = new RegExp(txt, 'i')
                books = books.filter(book => regex.test(book.title))
            }
            if (filterBy.maxPrice) {
                books = books.filter(book => book.listPrice <= filterBy.maxPrice)
            }
            return books
        })
}

function addReview(review, bookId) {
    storageService.get(BOOK_KEY, bookId)
        .then(book => {
            if(!book.reviews) book.reviews = [review]
            else book.reviews.push(review)
            save(book)
        })
}

function get(bookId) {
    return storageService.get(BOOK_KEY, bookId)
        .then(_setNextPrevBookId)
}

function remove(bookId) {
    return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
    if (book.id) {
        return storageService.put(BOOK_KEY, book)
    } else {
        return storageService.post(BOOK_KEY, book)
    }
}

function getEmptyBook(title = '', amount = 0) {
    return { id: '', title, language: 'en', pageCount: 0, listPrice: { amount, currencyCode: 'EUR' } }
}

function _createBooks() {
    let books = utilService.loadFromStorage(BOOK_KEY)
    if (!books || !books.length) {
        books = []
        books.push(_createBook('The Legends', 300))
        books.push(_createBook('Harry Potter', 120))
        books.push(_createBook('Game of Thrones', 100))
        utilService.saveToStorage(BOOK_KEY, books)
    }
}

function _createBook(title, amount = 200) {
    const book = getEmptyBook(title, amount)
    book.id = utilService.makeId()
    book.description = utilService.makeLorem(50)
    book.listPrice.currencyCode = "EUR"
    book.listPrice.inOnSale = false
    return book
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
        return query()
            .then(books => {
                    const idx = books.findIndex(book => item.id === book.id)
                    if (idx < 0) return storageService.post(BOOK_KEY, item)
                })
}

