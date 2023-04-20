import { eventBus } from "../../../services/event-bus.service.js"

export default {
    props: ['reviews'],
    template: `
    <section class="users-reviews">
        <h2>Reviews</h2>
        <div v-for="(review , idx) in reviews" :key="reviews" class="user-review">
            <h2>{{ review.name }}</h2>
            <div>
            <i v-for="star in review.rate" class="fa-regular fa-star checked"></i>
            </div>
            <small>{{ review.readAt }}</small>
            <button @click="remove(idx)"><i class="fa-regular fa-trash-can"></i></button>
        </div>
    </section>
    `,
    methods: {
        remove(idx) {
            this.reviews.splice(idx , 1)
            this.$emit('remove' , this.reviews)
            eventBus.emit('show-msg', { txt: 'Review removed', type: 'success' })
        }
    }
}