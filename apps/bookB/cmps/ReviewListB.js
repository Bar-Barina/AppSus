export default {
  props: ['book'],
  template: `
            <!-- <div class="reviews"> -->
              <div class="user-review" v-for="review in book.reviews" :key="review.id">
            <h2>{{review.fullname}} Review 📝</h2> 
            <hr>
                <p>{{review.rating}} ⭐</p> 
                <hr>
                <p>date: {{review.readAt}} </p>
                <button class="remove-btn" @click="remove(review.id)">x</button>  
           </div>
<!-- </div> -->
    `,
  methods: {
    remove(reviewId) {
      this.$emit('remove', reviewId)
      console.log(reviewId)
    },
  },
  components: {},
}
