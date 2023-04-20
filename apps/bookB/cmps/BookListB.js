import BookPreview from './BookPreviewB.js'

export default {
  props: ['books'],
  template: `
        <section class="book-list">
                <div v-for="book in books" :key="book.id" class="book-preview">
                    <BookPreview :book="book"/>
                    <RouterLink :to="'/bookB/'+book.id">Details</RouterLink> |
                    <RouterLink :to="'/bookB/edit/'+book.id">Edit</RouterLink> |
                    <button class="remove-btn" @click="remove(book.id)">x</button> 
                </div>  
        </section>
    `,
  methods: {
    remove(bookId) {
      this.$emit('remove', bookId)
    },
    showDetails(bookId) {
      this.$emit('show-details', bookId)
    },
  },
  components: {
    BookPreview,
  },
}
