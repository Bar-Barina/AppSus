import { emailService } from '../services/email.service.js'
import { svgService } from '../../../services/svg.service.js'
// import { eventBusService } from '../services/event-bus.service.js'

export default {
  template: `
        <section class="email-details" v-if="email">
              <p class="subject">{{email.subject}}</p>
              <div class="details-row">
             <div class="user-img-name">
                <img src="assets/img/person.png" class="user-img">
                <span class="format-name">{{formattedUserName}}</span>
                <p>{{email.from}}</p>
               </div>
                <div class="date-and-star">
                {{formattedTime}}
                <div @click="filter('star')" className="star" 
        v-html="getSvg('star')"></div>
             </div>
             </div>
              <p>{{email.body}}</p>
              <img :src="email.img">
              <br>
              <br>
              <RouterLink to="/mail">Back to list</RouterLink>
        </section>
    `,
  data() {
    return {
      email: null,
    }
  },
  created() {
    const { id } = this.$route.params
    emailService.get(id).then((email) => {
      this.email = email
    })
  },
  methods: {
    getSvg(iconName) {
      return svgService.getMailSvg(iconName)
    },
  },
  computed: {
    formattedUserName() {
      const idx = this.email.from.indexOf('@')
      return this.email.from.slice(idx + 1)
    },
    formattedTime() {
      return new Date()
    },
  },
  components: {
    emailService,
  },
}
