export default {
    template: `
        <section class="book-filter">
            <input class="search"
                v-model="filterBy.title"
                @input="filter" 
                placeholder="Search"
                type="text" />
                <!-- <i class="fa-solid fa-magnifying-glass"></i> -->

                <input class="number"
                v-model="filterBy.amount"
                @input="filter" 
                placeholder="Price"
                type="range" :title="filterBy.amount"/>

                <input class="search-pageCount"
                v-model="filterBy.pageCount"
                @input="filter" 
                placeholder="Search by page count"
                type="text" />

                <input class="search-publishedDate"
                v-model="filterBy.publishedDate"
                @input="filter" 
                placeholder="Search by published Date"
                type="text" />
            </section>
            `,
    data() {
        return {
            filterBy: { title: '', amount: 700 , pageCount: 1500,publishedDate: 2023},
        }
    },
    methods: {
        filter(){
            this.$emit('filter', this.filterBy)
        }
    }
}