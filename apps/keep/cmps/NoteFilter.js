import { svgService } from "../../../services/svg.service.js"
import { eventBus } from "../../../services/event-bus.service.js"

export default {
    template: `
    <section class="filter-keep">
    </section>
    `,
    data() {
        return {
            filterBy: { txt: '', noteType: '' }
        }
    },
    created() {
        eventBus.on('filterTxt', (txt) => this.filterBy.txt = txt)
    },
    methods: {
        filter() {
            this.$emit('filter', this.filterBy)
        },
        getSvg(iconName) {
            return svgService.getSvg(iconName)
        },
        closeSearch() {
            this.filterBy.noteType = ''
            this.$emit('closeSearch')
        }
    },
    watch: {
        filterBy: {
            handler() {
                this.$emit('filter', this.filterBy)
            },
            deep: true
        },
    }
}