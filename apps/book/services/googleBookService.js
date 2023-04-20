import { utilService } from "../../../services/util.service.js"

export const googleBookService = {
    query,
    updateBookObject
}

function query(txt) {
    const url = `https://www.googleapis.com/books/v1/volumes?q=${txt}`
    const books = axios.get(url)
    .then(res => {
        return res.data.items
    })
    return books
}

function updateBookObject(book) {
    const updatedBook = {
        id: book.id,
        title: book.volumeInfo.title,
        subtitle: book.volumeInfo.subtitle,
        publishedDate: book.volumeInfo.publishedDate,
        categories: book.categories,
        pageCount: book.pageCount,
        language: book.language,
        thumbnail: book.volumeInfo.imageLinks.thumbnail,
        description: book.description,
        authors: book.volumeInfo.authors,
        listPrice: {
             amount: utilService.getRandomIntInclusive(10, 200),
             currencyCode: 'ILS',
             isOnSale: (Math.random() > 0.5) ? true : false
            }
    }
    return updatedBook
}