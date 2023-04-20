import NoteTxt from "./NoteTxt.js"
import NoteImg from "./NoteImg.js"
import NoteVideo from "./NoteVideo.js"
import NoteTodos from "./NoteTodos.js"
import NoteEditor from "./NoteEditor.js"
import MakeCanvas from "./MakeCanvas.js"
import NoteAudio from "./NoteAudio.js"
import NoteMap from "./NoteMap.js"

import { eventBus } from "../../../services/event-bus.service.js"
import { svgService } from '../../../services/svg.service.js'

export default {
    name: 'NotePreview',
    emits: ['copy' , 'updateColor','updateInfo'],
    props: ['note' , 'edit'],
    template: `
    <article class="note-preview" :style="note.style">
    <Component :is="note.type" @updateInfo="updateNote" :editAble="isEditAble" :info="note.info"></Component>
    <div v-if="note.isPinned" className="icon-pin" v-html="getSvg('pin1')"
    @click.stop="pin">
</div>
<div className="icon-pin" v-if="!note.isPinned" v-html="getSvg('unPin1')"
    @click.stop="pin">
</div>
    <NoteEditor @updateColor="passColor" @copy="copyNote" :noteId="note.id" :note="note"/>
    </article>
    `,
    data() {
        return {

        }
    },
    created() {
    },
    methods: {
        passColor(updateObj) {
            eventBus.emit('updateNoteInfo' , updateObj)
        },
        getSvg(iconName) {
            return svgService.getSvg(iconName)
        },
        pin() {
            this.note.isPinned = !this.note.isPinned
            this.$emit('save', this.note)
        },
        updateNote(info) {
            eventBus.emit('updateNoteInfo', { toUpdate: info, key: 'info', noteId: this.note.id })
        },
        copyNote(noteId) {
            this.$emit('copyNote' , noteId)
        }
    },
    computed: {
        isEditAble() {
            if(this.edit) return true
        }
    },
    components: {
        NoteTodos,
        NoteVideo,
        NoteImg,
        NoteTxt,
        NoteEditor,
        MakeCanvas,
        NoteAudio,
        NoteMap
    }
}