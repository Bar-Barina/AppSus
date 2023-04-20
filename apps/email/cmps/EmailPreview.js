import { svgService } from '../../../services/svg.service.js'

export default {
    name: 'emailPreview',
    props: ['email'],
    template: `
        <div class="email-preview" :class="{read: email.isRead}">
        <section class="preview-svgs-user">
        <div @click="" className="checkBox" 
                v-html="getSvg('checkBox')"></div>
                
        <div v-if="email.isStarred" @click.stop="email.isStarred = false" className=" starFill" 
        v-html="getSvg('starFill')"></div>

        <div v-else @click.stop="email.isStarred = true" className="star" 
        v-html="getSvg('star')"></div>

    <div @click="filter('labelImportantFill')" className="labelImportantFill" 
            v-html="getSvg('labelImportantFill')"></div>
            <p>{{ formattedUserName }}</p>
</section>
            <div class="subject-body">
            <p class="preview-content">{{ email.subject}}</p>
            <p class="preview-content body-prev">{{ email.body}}</p>
           </div>
            <p class="preview-date">{{ email.sentAt}}</p>
            <div class="preview-btns">
                  <div @click.stop="makeNote" class="keep-btn"
            v-html="getSvg('keepMail')"></div>
                <div @click.stop="moveToTrash(email.id)" class="remove-btn"
                v-html="getSvg('trash')"></div>
            </div>
     </div>
    `,
    methods: {
        getSvg(iconName) {
            return svgService.getMailSvg(iconName)
        },
        moveToTrash(emailId) {
            this.$emit('moveToTrash' , emailId)
        },
        makeNote() {
            this.$router.push({ path: '/keep', query: {title: this.email.subject, txt: this.email.body}})
        }
    },
    computed: {
        formattedUserName() {
            const idx = this.email.from.indexOf('@')
            return this.email.from.slice(idx + 1)
        },
    },
}