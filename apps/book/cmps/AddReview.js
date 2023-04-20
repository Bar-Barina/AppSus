import { bookService } from "../services/book.service.js"
import { eventBus } from "../../../services/event-bus.service.js"
import RateByStar from "./RateByStar.js"
import RateBySelect from "./RateBySelect.js"
import RateByTextBox from "./RateByTextBox.js"


export default {
    template: `
    <section class="review">
        <h3>Your review</h3>
        <div class="radio-inputs">
                <span class="sub-titles">Your rate preference?</span>
                <label>
                    Stars
                <input type="radio" value="RateByStar" v-model="rateType" checked>
                </label>
                <label>
                    Textbox
                <input type="radio" value="RateByTextBox" v-model="rateType">
                </label>
                <label>
                Select
                <input type="radio" value="RateBySelect" v-model="rateType">
                </label>
                </div>
        <form @submit.prevent="addReview">
            <input type="text" v-model="review.name" placeholder="Your name">
                <Component :is="rateType" :val="review.rate" @rate="changeRate"></Component>
            <label for="dateRead">Read at:</label>
            <input id="dateRead" type="date" v-model="review.readAt">
            <button class="btn-review"><i class="fa-solid fa-share"></i></button>
        </form>
    </section>
    `,
    data() {
        return {
            review: { name: null, rate: 1, readAt: null },
            book: null,
            rateType: RateByStar
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
        changeRate(rate) {
            console.log('rate', rate)
            this.review.rate = rate
        },
        addReview() {
            bookService.addReview(this.review, this.book.id)
            eventBus.emit('show-msg', { txt: 'Review Added', type: 'success' })
            this.$emit('added', this.review)
            this.review = { name: null, rate: 1, readAt: null }
        },
    },
    watch: {
        rateType() {
            console.log('this.rate', this.rateType)
        }
    },
    components: {
        RateBySelect,
        RateByStar,
        RateByTextBox
    }
}