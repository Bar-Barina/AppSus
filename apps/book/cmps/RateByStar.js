export default {
    props: ['val'],
    template: `
    <div>
            <i v-for="(star,idx) in 5" :key="star"
            class="fa-regular fa-star"
            @click="setStarRate(idx)"
            :class="{ checked: (idx < rate)}">
            </i>
            </div>
    `,
    data() {
        return {
            rate: this.val,
        }
    },
    methods: {
        setStarRate(idx) {
            if (this.rate) {
                this.rate = idx + 1
            }
            this.updateRate()
        },
        updateRate() {
            this.$emit('rate' , this.rate)
        }
    },
}