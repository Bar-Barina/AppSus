import EmailPreview from './EmailPreview.js'
import { svgService } from '../../../services/svg.service.js'
import { eventBus } from '../../../services/event-bus.service.js'
// @click="remove(email.id)"

export default {
  props: ['emails'],
  template: `
    <div class="full-list">
        <section class="email-list">
            <div class="empty-div"></div>
                <div v-for="email in emails" :key="email.id" 
                 @click.native="showDetails(email.id)"
                class="email-preview" :email="email">
                <EmailPreview @moveToTrash="moveToTrash" :email="email"/>
            </div>
        </section>
      </div>
    `,
  methods: {
    remove(emailId) {
      this.$emit('remove', emailId)
    },
    getSvg(iconName) {
      return svgService.getMailSvg(iconName)
    },
    showDetails(mailId) {
      const email = this.emails.find((email) => email.id === mailId)
      console.log(email)
      if (email.status === 'draft') {
        console.log('draft')
        this.$emit('editDraft', email)
      } else {
        email.isRead = true
        this.$emit('toDetails', { mailId: mailId })
      }
    },
    moveToTrash(emailId) {
      const email = this.emails.find((email) => email.id === emailId)
      if (email.status === 'trash') this.remove(emailId)
      else {
        email.status = 'trash'
        eventBus.emit('show-msg', { txt: 'Moved to trash', type: 'success' })
      }
    },
  },
  components: {
    EmailPreview,
  },
}
