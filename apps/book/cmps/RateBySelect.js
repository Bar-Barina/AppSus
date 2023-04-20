export default {
    props: ['val'],
    template: `
    <select name="rate" v-model="" v-model="rate">
    <option v-for="opt in 5">{{opt}}</option>
    </select>
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