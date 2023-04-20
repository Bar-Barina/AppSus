export default {
    props: ['books'],
    template: `
    <section class="books-filter">
        <input v-model="filterBy.title"
        @input="filter"
        placeholder="Search"
        type="text"/>
        <label for="max-price">Max price</label>
        <input id="max-price"
        type="range"
        min="0"
        max="400"
        v-model="filterBy.maxPrice"
        @input="filter"/>
        <span>{{ filterBy.maxPrice }}</span>
    </section>
    `,
    data() {
        return {
            filterBy: { title: '', maxPrice: 400},
        }
    },
    methods: {
        filter() {
            this.$emit('filter', this.filterBy)
        }
    },
}