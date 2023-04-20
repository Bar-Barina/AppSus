import BookPreview from './BookPreview.js'

export default {
    props: ['books'],
    template: `
    <section class="books-list">
        <ul>
            <li v-for="book in books" :key="book.id">
                <BookPreview :book="book"/>
                <div class="book-actions">
                <RouterLink :to="'/book/'+book.id">Details</RouterLink>
                    <RouterLink :to="'/book/edit/'+book.id">Edit</RouterLink>
                </div>
                <button @click="remove(book.id)">X</button>
            </li>
        </ul>
    </section>
    `,
    methods: {
        remove(bookid) {
            this.$emit('remove', bookid)
        },
        showDetails(bookId) {
            this.$emit('show-details', bookId)
        }
    },
    components: {
        BookPreview,
    }
}