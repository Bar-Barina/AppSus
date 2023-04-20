import { eventBus } from '../../../services/event-bus.service.js'
import { bookService } from '../services/bookB.service.js'

import LongTxt from '../cmps/LongTxtB.js'
import AddReview from '../cmps/AddReviewB.js'
import ReviewListB from '../cmps/ReviewListB.js'

export default {
  template: `
        <section class="book-details" v-if="book">
          <RouterLink to="/bookB">Back to list</RouterLink>
          <h2>{{ book.title }} by <span class="authors">{{ authors }}</span></h2>
          <LongTxt :txt="book.description" />
          <h4 class="sale" v-if="book.listPrice.isOnSale">ON SALE!</h4>
          <span :class="handleAmountClass">{{ formattedPrice }}</span>
          <hr>
          <img :src="book.thumbnail" alt="thumbnail">
          <hr> 
          <nav>
              <RouterLink :to="'/bookB/' + book.prevBookId">Previous Book</RouterLink> |
              <RouterLink :to="'/bookB/' + book.nextBookId">Next Book</RouterLink>
         </nav>
            <div class="extra-details">
            <p><span>Published Date:</span> {{book.publishedDate}} {{ handleDateState }}</p>
            <p><span>Page Count: </span>{{book.pageCount}} {{ handleReadingState }}</p>
            <p><span>Categories:</span> {{ book.categories[0] }}</p>
            <p><span>Language:</span> {{ book.language }}</p>
           </div>
          
        

         
          <section class="review-section">
          <AddReview :bookId="book.id" />
          <div class="review-list-div">
            <ReviewList  v-if="(book.reviews)" :book="book" @remove="removeReview" />
            <h3 v-else>No <br> Reviews <br> Yet <br> 📝</h3>
        </section>
        </section>
    `,
  data() {
    return {
      book: null,
    }
  },
  created() {
    // const { bookId } = this.$route.params
    // bookService.get(bookId).then((book) => (this.book = book))
    this.loadBook()
  },
  methods: {
    removeReview(reviewId) {
      bookService
        .removeRev(this.book.id, reviewId)
        .then((updatedBook) => {
          this.book = updatedBook
          eventBus.emit('show-msg', {
            txt: 'Review removed',
            type: 'success',
          })
        })
        .catch((err) => {
          eventBus.emit('show-msg', {
            txt: 'Review remove failed',
            type: 'error',
          })
        })
    },
    loadBook() {
      bookService.get(this.bookId)
          .then(book => this.book = book)
  },
  },
  computed: {
    handleReadingState() {
      const currCount = this.book.pageCount
      if (currCount >= 500) return ', Serious Reading'
      if (currCount >= 200) return ', Descent Reading '
      if (currCount < 100) return ', Light Reading'
    },
    handleDateState() {
      const currYear = new Date().getFullYear()
      if (currYear - 10 > this.book.publishedDate) return ', Vintage'
      if (currYear - 1 <= this.book.publishedDate) return ', New'
    },
    handleAmountClass() {
      const currAmount = this.book.listPrice.amount
      return { red: currAmount > 150, green: currAmount < 20 }
    },
    formattedPrice() {
      const { amount, currencyCode } = this.book.listPrice
      return new Intl.NumberFormat('en', {
        style: 'currency',
        currency: currencyCode,
      }).format(amount)
    },
    authors() {
      return this.book.authors.join(', ')
    },
    bookId() {
      return this.$route.params.bookId
  }
  },
  watch: {
    bookId() {
        console.log('BookId Changed!')
        this.loadBook()
    }
},
  components: {
    LongTxt,
    AddReview,
    ReviewListB,
  },
}
