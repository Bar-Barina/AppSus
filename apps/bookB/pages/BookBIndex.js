import { eventBus } from '../../../services/event-bus.service.js'
import { bookService } from '../services/bookB.service.js'

import BookFilter from '../cmps/BookFilterB.js'
import BookList from '../cmps/BookListB.js'

export default {
  template: `
        <section class="book-index">
          <div class="actions-container">
          <BookFilter @filter="setFilterBy"/>
        <RouterLink to="/bookB/edit"> <i class="fa-solid fa-book"></i> Add a book</RouterLink>
        <RouterLink to="/bookB/add"> Search by <i class="fa-brands fa-google"></i></RouterLink>
         </div>
          <BookList 
          v-if="books" 
          :books="filteredBooks" 
          @remove="removeBook" />
        
        </section>
    `,
  data() {
    return {
      books: null,
      selectedBook: null,
      filterBy: {
        title: '',
        amount: 700,
        pageCount: 1500,
        publishedDate: 2023,
      },
    }
  },
  methods: {
    removeBook(bookId) {
      bookService
        .remove(bookId)
        .then(() => {
          const idx = this.books.findIndex((book) => book.id === bookId)
          this.books.splice(idx, 1)
          eventBus.emit('show-msg', {
            txt: 'Book removed',
            type: 'success',
          })
        })
        .catch((err) => {
          eventBus.emit('show-msg', {
            txt: 'Book remove failed',
            type: 'error',
          })
        })
    },
    setFilterBy(filterBy) {
      this.filterBy = filterBy
    },
  },
  computed: {
    filteredBooks() {
      const regex = new RegExp(
        this.filterBy.title &&
          this.filterBy.amount &&
          this.filterBy.pageCount &&
          this.filterBy.publishedDate,
        'i'
      )
      return this.books.filter(
        (book) =>
          regex.test(book.title) &&
          this.filterBy.amount >= book.listPrice.amount &&
          this.filterBy.pageCount >= book.pageCount &&
          this.filterBy.publishedDate >= book.publishedDate
      )
    },
  },
  created() {
    bookService.query().then((books) => (this.books = books))
  },
  components: {
    BookFilter,
    BookList,
  },
}
