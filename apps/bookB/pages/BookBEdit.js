import { eventBus } from '../../../services/event-bus.service.js'
import { bookService } from '../services/bookB.service.js'

export default {
  template: `
        <section class="book-edit">
        <h2>{{(book.id)? 'Edit' : 'Add'}} a book <i class="fa-solid fa-book"></i></h2>
            <form @submit.prevent="save" class="edit-form">
                <label for="text">Book Title ------></label>
                <input type="text" v-model="book.title" placeholder="Title">
                <label for="text">Book Price ------></label>
                <input type="number" v-model.number="book.amount">
                <button class="animate__heartBeat">Save</button>
            </form>
            <img src="assets/img/BookEdit.jpg" class="book-editor"/>
        </section>
    `,
  data() {
    return {
      book: bookService.getEmptyBook(),
    }
  },
  created(){
    const {bookId} = this.$route.params
    if (bookId) {
        bookService.get(bookId)
            .then(book => this.book = book)
    }
},
  methods: {
    save() {
      bookService.save(this.book)
          .then(savedBook => {
            eventBus.emit('show-msg', { txt: 'Book saved', type: 'success' })
              this.$router.push('/book')
          })
          .catch(err=>{
            eventBus.emit('show-msg', { txt: 'Book save failed', type: 'error' })
          })
  },
  animateSave() {
    animate__heartBeat
  }
}
}
