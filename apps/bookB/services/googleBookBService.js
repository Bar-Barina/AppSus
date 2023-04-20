'use strict'

// import { utilService } from './util.service.js'
// import { storageService } from './async-storage.service.js'

// import { axios } from '../lib/axios.js'
// import booksDB from './../data/book.json' assert { type: 'json' }

export const googleBookService = {
  query,
}

function query(txt) {
  const url = `https://www.googleapis.com/books/v1/volumes?printType=books&q=${txt}`
 return axios.get(url).then((res) => {
    return res.data.items
  })
}
