import { bookService } from '../services/bookB.service.js'

export default {
  props: ['bookId'],
  template: `
    <form @submit.prevent="saveReview" class="user-add-review">
        <div class="user-review-form">
        <h2>Add A Review!</h2>
      <label for="fullname">Fullname:</label>
      <input type="text" class="fullname" v-model="review.fullname">
      <hr>
      <label for="rating">Rating:</label>  
      <select class="rating" v-model.number="review.rating">
        <option value="1">1 star</option>
        <option value="2">2 stars</option>
        <option value="3">3 stars</option>
        <option value="4">4 stars</option>
        <option value="5">5 stars</option>
      </select>
      <hr>
      <label for="readAt">Read at:</label>
      <input type="date" class="readAt" v-model="review.readAt">
      <hr>
      <button type="submit">Submit</button>
</div>
      <hr>
    </form>
    `,
  data() {
    return {
      review: {
        fullname: '',
        rating: 1,
        readAt: '',
      },
    }
  },
  mounted() {

  },
  methods: {
    saveReview() {
      console.log('review saved!')
      bookService.addReview(this.bookId, this.review)
    },
  },
  components: {
    bookService,
  },
}
