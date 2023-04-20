export default {
    props: ['txt'],
    template: `
    <h4 class="sub-titles">Book Description</h4>
    <p>{{txtByLength}}
    <button class="btn-more" @click="showMore" v-if="isLong">
        <span v-if="!isMore">Read more</span>
        <span v-if="isMore">Show less</span>
    </button></p>
    `,
    data() {
        return {
            isMore: false
        }
    },
    methods: {
        showMore() {
            this.isMore = !this.isMore
        }
    },
    computed: {
        txtByLength() {
            if(this.txt.length > 100 && !this.isMore) return this.txt.slice(0 , 100) + '...'
            else return this.txt
        },
        isLong() {
            if(this.txt.length > 100) return true
            else return false
        }
    }
}