import { eventBus } from '../../../services/event-bus.service.js'
import { svgService } from '../../../services/svg.service.js'

import EmailComposed from '../cmps/EmailCompose.js'

export default {
  props: ['emails'],
  template: `
        <section class="email-side-filter">
        <EmailComposed :noteInfo="noteInfo" @close="isCompose = false" 
        v-if="isCompose"/>
        <!-- Compose -->
        <section @click="isCompose = true" class="filter-section compose-icon">
          <div className="compose" 
            v-html="getSvg('compose')"></div>
            <span>Compose</span>
         </section>

          <!-- Inbox -->
          <section @click="filter('inbox')" :class="{ 'selected': filterBy.status === 'inbox' }"  class="filter-section-svg">
          <div className="inbox" 
            v-html="getSvg('inboxFill')"></div>
            <span>Inbox</span>
            <span v-if="emails" class="unread-num">{{getUnreadCount('inbox')}}</span>
         </section>

           <!-- Starred -->
           <section @click="filter('starred')" :class="{ 'selected': filterBy.status === 'starred' }" class="filter-section-svg">
          <div className="star" 
            v-html="getSvg('star')"></div>
            <span>Starred</span>
            <span v-if="emails" class="unread-num">{{getUnreadCount('starred')}}</span>
         </section>
            
          <!-- Sent -->
          <section @click="filter('sent')" :class="{ 'selected': filterBy.status === 'sent' }" class="filter-section-svg">
           <div className="sent" 
            v-html="getSvg('sent')"></div>
            <span>Sent</span>
            <span v-if="emails" class="unread-num">{{getUnreadCount('sent')}}</span>
            </section>

            <!-- Draft -->
            <section @click="filter('draft')" :class="{ 'selected': filterBy.status === 'drafts' }" class="filter-section-svg">
              <div className="draft" 
              v-html="getSvg('drafts')"></div>
              <span>Drafts</span>
            </section>
            <!-- Trash -->
          <section @click="filter('trash')" :class="{ 'selected': filterBy.status === 'trash' }" class="filter-section-svg">
           <div className="trash" 
            v-html="getSvg('trash')"></div>
            <span>Trash</span>
            <span v-if="emails" class="unread-num">{{getUnreadCount('trash')}}</span>
            </section>
            <!-- <section class="label-div">
              <div class="label">
                <span>Labels</span>
                <button class="plus">+</button>
              </div>
            </section> -->
            </section>

            `,
  data() {
    return {
      noteInfo: null,
      isCompose: false,
      filterBy: {
        status: 'inbox',
        txt: '', // no need to support complex text search
        isRead: true, // (optional property, if missing: show all)
        isStared: true, // (optional property, if missing: show all)
        lables: ['important', 'romantic'], // has any of the labels
      },
    }
  },
  created() {
    eventBus.on('openCompose', (email) => {
      this.isCompose = true
      eventBus.emit('composeOpened', email)
    })
  },
  methods: {
    filter(status) {
      this.filterBy.status = status
      this.$emit('filter', this.filterBy.status)
    },
    getSvg(iconName) {
      return svgService.getMailSvg(iconName)
    },
    getUnreadCount(status) {
      let unreadEmails = this.emails.filter(
        (email) => email.status === status && !email.isRead
      )
      if (!unreadEmails.length) return
      return unreadEmails.length
    },
  },
  watch: {
    '$route.query': {
      immediate: true,
      handler(newVal) {
        if(Object.keys(newVal).length === 0) return
          this.isCompose = true
          this.noteInfo = newVal
      }
    }
  },
  components: {
    EmailComposed,
  },
}
