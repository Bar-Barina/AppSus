import { bookService } from "../services/book.service.js"
import { eventBus } from "../../../services/event-bus.service.js"


export default {
    template: `
    <section class="">
    <RouterLink class="btn-back-edit" to="/book">Back</RouterLink>
    <section class="book-edit">
        <form @submit.prevent="save">
            <h2>{{ titleDisplay }}</h2>
            <input type="text" v-model="book.title" placeholder="Book Title" required/>
            <input type="text" v-model="book.subtitle" placeholder="Book subtitle" required/>
            <input type="number" v-model.number="book.listPrice.amount" title="Book price" required/>
            <input type="number" v-model.number="book.pageCount" title="Page count" required/>
            <select v-model="book.listPrice.currencyCode">
                <option value="EUR">EUR</option>
                <option value="ILS" >ILS</option>
                <option value="USD">USD</option>
            </select>
            <input type="text" v-model="book.authors" placeholder="Author name"/>
            <input type="text" v-model="book.publishedDate" placeholder="Publised year"/>
            <input type="text" v-model="book.categories" placeholder="Categories"/>
            <input type="text" v-model="book.description" placeholder="Book description"/>
            <input type="text" v-model="book.thumbnail" placeholder="Book's url image"/>
            <p>Is on sale?
            <input type="checkbox" v-model="book.listPrice.isOnSale"/>
            </p>
            <p>Select language</p>
            <select v-model="book.language" required>
                <option value="en">en</option>
                <option value="he">he</option>
            </select>
            <button>Add</button>
        </form>
        <div>
        <img src="assets/img/open-book.jpg">
        </div>
    </section>
    </section>
    `,
    data() {
        return {
            book: bookService.getEmptyBook()
        }
    },
    created() {
        const { bookId } = this.$route.params
        if (bookId) {
            bookService.get(bookId)
                .then(book => this.book = book)
        }
    },
    methods: {
        save() {
            bookService.save(this.book)
                .then(() => {
                    this.book = bookService.getEmptyBook()
                    eventBus.emit('show-msg', { txt: 'Book saved', type: 'success' })
                    this.$router.push('/book')
                })
        },
        goBack() {
            this.$emit('go-back')
        }
    },
    computed: {
        titleDisplay() {
            if (this.book.id) return `Edit ${this.book.title}`
            else return 'Add a book'
        }
    }
}