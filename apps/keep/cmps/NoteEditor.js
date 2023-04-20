import { eventBus } from "../../../services/event-bus.service.js"
import { svgService } from "../../../services/svg.service.js"
import ColorPicker from "./ColorPicker.js"

export default {
    emits: ['updateNote' , 'color', 'copy', 'updateInfo' , 'updateColor'],
    props: ['noteId' , 'note'],
    template: `
    <section class="note-editor">
    <div data-title="Background options" @click.stop="openColor = !openColor" className="icon-editor" v-html="getSvg('colorPallet1')"></div>
    <div @click.stop="copy" className="icon-editor" v-html="getSvg('copy1')"></div>
    <div @click.stop="makeEmail" className="icon-editor" v-html="getSvg('mail')"></div>
    <div @click.stop="remove" className="icon-editor" v-html="getSvg('trash')"></div>
    </section>
    <ColorPicker @color="changeColor" v-show="openColor" :note="note"/>
    `,
    data() {
        return {
            openColor: false
        }
    },
    methods: {
        getSvg(iconName) {
            return svgService.getSvg(iconName)
        },
        changeColor(color) {
            this.$emit('updateColor', { noteId: this.noteId, toUpdate: color, key: 'style' })
        },
        remove() {
            eventBus.emit('removeNote', this.noteId)
        },
        copy() {
            this.$emit('copy', this.noteId)
        },
        makeEmail() {
            this.$router.push({ path: '/mail', query: {subject: this.note.info.title, body: this.note.info.txt}})
        }
    },
    components: {
        ColorPicker
    }
}