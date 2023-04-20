import { bookService } from "../services/book.service.js"
import LongTxt from "../cmps/LongTxt.js"
import AddReview from "../cmps/AddReview.js"
import ReviewPreview from "../cmps/ReviewPreview.js"

export default {
    template: `
    <section v-if="book" class="details-page">
    <RouterLink :to="'/book/' + book.prevBookId"><i class="fa-solid fa-chevron-left btn-prev"></i></RouterLink>
        <section class="book-details">
            <div class="sale" v-if="book.listPrice.isOnSale">On sale</div>
            <h1>{{ book.title }}</h1>
            <h2>{{ book.subtitle }}</h2>
            <h3 :class="classObject">{{ formattedPrice }}</h3>
            <h4><span class="sub-titles">Author:</span> <span v-for="author in book.authors">{{ author }}</span> |
            <span class="sub-titles">Page count:</span> {{ book.pageCount}} , {{ readingLevel }}</h4>
            <h4></h4>
            <img :src="book.thumbnail">
            <LongTxt :txt="book.description"/>
            <div><h5><span class="sub-titles">Published Date:</span> {{ book.publishedDate }} , {{ publishStatus }} |
            <span class="sub-titles">Categories:</span> <span v-for="categorie in book.categories">{{ categorie }}</span> |
            <span class="sub-titles">Language:</span> {{ book.language }} </h5>
            </div>
            <hr>
            <ReviewPreview 
            v-if="(book.reviews)"
            @remove="removeReview" 
            :reviews="book.reviews"/>
            <h3 v-else>No reviews yet</h3>
            <hr>
            <AddReview @added="reviewAdded"/>
        </section>
    <RouterLink :to="'/book/' + book.nextBookId"><i class="fa-solid fa-chevron-right btn-next"></i></RouterLink>
    </section>
    `,
    data() {
        return {
            defaultImgUrl: '../images/book-cover.jpeg',
            book: null
        }
    },
    created() {
        this.loadBook()
    },
    methods: {
        closeDetails() {
            this.$emit('hide-details')
        },
        removeReview(reviews) {
            this.book.reviews = reviews
            bookService.save(this.book)
        },
        reviewAdded(review) {
            if(!this.book.reviews) this.book.reviews = [review]
            else this.book.reviews.push(review)
        },
        loadBook() {
            const { bookId } = this.$route.params
        bookService.get(bookId)
            .then(book => this.book = book)
        }
    },
    watch: {
        bookId() {
            this.loadBook()
        }
    },
    computed: {
        bookId() {
            return this.$route.params.bookId
        },
        readingLevel() {
            if (this.book.pageCount > 500) return 'Serious reading'
            else if (this.book.pageCount > 200) return 'Descent reading'
            else if (this.book.pageCount <= 200) return 'Light reading'
        },
        publishStatus() {
            const currYear = new Date().getFullYear()
            const diff = currYear - this.book.publishedDate
            if (diff <= 1) return 'New'
            else if (diff > 10) return 'Vintage'
        },
        classObject() {
            return {
                red: this.book.listPrice.amount > 150,
                green: this.book.listPrice.amount < 20
            }
        },
        formattedPrice() {
            const { amount, currencyCode } = this.book.listPrice
            return new Intl.NumberFormat('en', { style: 'currency', currency: currencyCode }).format(amount)
        },
    },
    components: {
        LongTxt,
        AddReview,
        ReviewPreview
    }
}