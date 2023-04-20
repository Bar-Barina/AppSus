import NotePreview from "../cmps/NotePreview.js"

import { eventBus } from "../../../services/event-bus.service.js"
import { noteService } from "../services/note.service.js"
import { utilService } from "../../../services/util.service.js"

export default {
    name: 'NoteDetails',
    emits: ['removeNote'],
    template: `
    <section v-if="note" class="note-details">
    <Transition >
    <NotePreview :edit="true" v-if="note" :note="this.note"/>
    </Transition>
    <RouterLink class="close" to="/keep">Close</RouterLink>
    </section>
    `,
    data() {
        return {
            note: null
        }
    },
    created() {
        eventBus.on('updateNoteInfo' , (changeObj) => {
            this.update(changeObj)
        })
        this.loadNote()
        eventBus.on('removeNote', () => {
            if(this.note){
                this.note = null
            }
        })
    },
    methods: {
        loadNote() {
            const { id } = this.$route.params
            noteService.get(id)
                .then(note => {
                    this.note = note
                })
        },
        update(changeObj) {
            if(this.note) {
                this.note[changeObj.key] = changeObj.toUpdate
            }
        }
    },
    components: {
        NotePreview
    },
}