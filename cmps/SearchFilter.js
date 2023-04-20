import { svgService } from '../services/svg.service.js'
import { eventBus } from '../services/event-bus.service.js'

export default {
  template: `
        <section class="search-filter">
            <input type="search" class="header-search-input"
            @input="sendSearch" v-model="txt"
                placeholder="Search"/>
            </section>
            `,
  data() {
    return {
      txt: '',
    }
  },
  methods: {
    getSvg(iconName) {
      return svgService.getMailSvg(iconName)
    },
    sendSearch() {
      eventBus.emit('search' , this.txt)
    },
  },
}
