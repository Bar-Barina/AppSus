import { bookService } from '../services/book.service.js'
import { eventBus } from '../../../services/event-bus.service.js'

import BookFilter from '../cmps/BookFilter.js'
import BookList from '../cmps/BookList.js'

export default {
    template: `
    <section class="books-index">
        <div class="filter-btns-section">
        <button v-if="isFilter" class="btn-filter" @click="toggleFilter">close</button>
        <button v-if="!isFilter" class="btn-filter" @click="toggleFilter">Filter</button>
        <RouterLink to="/book/edit">Add book</RouterLink>
        <RouterLink to="/book/add">Search in google</RouterLink>
        </div>
        <BookFilter :class="{ open: isFilter}" :books="books" @filter="setFilterBy"/>
        <BookList 
        :books="filteredBooks" 
        v-if="books"
        @remove="removeBook"/>
    </section>
    `,
    data() {
        return {
            books: null,
            selectedBook: null,
            filterBy: {maxPrice: 400},
            add: false,
            isFilter: false
        }
    },
    created() {
        bookService.query()
            .then(books => this.books = books)
    },
    methods: {
        removeBook(bookId) {
            bookService.remove(bookId)
                .then(() => {
                    const idx = this.books.findIndex(book => book.id === bookId)
                    this.books.splice(idx, 1)
                    eventBus.emit('show-msg', { txt: 'Book removed', type: 'success' })
                })
        },
        setFilterBy(filterBy) {
            this.filterBy = filterBy
        },
        toggleAdd() {
            this.add = !this.add
        },
        toggleFilter() {
            this.isFilter = !this.isFilter
        },
        closeEdit() {
            this.add = false
        }
    },
    computed: {
        filteredBooks() {
            const regex = new RegExp(this.filterBy.title, 'i')
            return this.books.filter(book => regex.test(book.title) &&
            book.listPrice.amount < this.filterBy.maxPrice)
        }
    },
    created() {
        bookService.query()
            .then(books => this.books = books)
    },
    components: {
        bookService,
        BookList,
        BookFilter,
    }
}