import { bookService } from '../services/bookB.service.js'
import { googleBookService } from '../services/googleBookBService.js'

export default {
  template: `
  <form @submit.prevent="submit" class="google-search">
    <input v-model="txt" type="text" placeholder="Search a book"/>
    <button>Submit</button>
        <template v-if="books" v-for="book in books">
        <ul>
        <li>{{book.volumeInfo.title}}
        <button @click="save(book)">+</button>
      </li>
      </ul>
    </template>
  </form>
    `,
  data() {
    return {
      books: [],
      txt: '',
    }
  },
  methods: {
    submit() {
      googleBookService.query(this.txt).then(books => this.books = books)
    },
    save(book) {
      const newBook = bookService.prepareData(book)
      bookService.addGoogleBook(newBook)
    },
  },
}
