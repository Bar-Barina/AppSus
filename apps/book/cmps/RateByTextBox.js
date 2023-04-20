export default {
    props: ['val'],
    template: `
    <input type="number" min="1" max="5" v-model="rate">
    `,
    data() {
        return {
            rate: this.val,
        }
    },
    watch: {
        rate() {
            this.$emit('rate' , this.rate)
        }
    }
}