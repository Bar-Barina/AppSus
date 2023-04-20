export default {
    template: `
        <section class="email-search-filter">
            <input
                v-model="filterBy.txt"
                @input="filter" 
                placeholder="🔍 Search mail"
                type="text" />
            </section>
            `,
    data() {
        return {
            filterBy:  {
                status: '',
                txt: '', // no need to support complex text search
                isRead: true, // (optional property, if missing: show all)
                isStared: true, // (optional property, if missing: show all)
                lables: ['important', 'romantic'] // has any of the labels
               }
        }
    },
    methods: {
        filter(){
            this.$emit('filter', this.filterBy)
        }
    }
}