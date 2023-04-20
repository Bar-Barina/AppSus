import NotePreview from "./NotePreview.js"

export default {
    emits: ['saveNote' , 'copyNote'],
    props: ['notes'],
    template: `
    <section class="pinned-notes">
    <h5 class="pin-header">PINNED</h5>
    <section class="notes-list">
        <div v-for="note in pinnedNotes" :key="note"
            @click.native="$router.push('/keep/' + note.id)">
            <NotePreview @copyNote="makeCopyNote" :edit="false"  @save="saveNote" :note="note"/>
        </div>
    </section> 
    </section>
    <section class="un-pinned-notes">
        <h5 class="pin-header">OTHERS</h5>
    <section class="notes-list">
            <div v-for="note in unPinnedNotes" :key="note.id"
            @click.native="$router.push('/keep/' + note.id)">
                <NotePreview @copyNote="makeCopyNote" :edit="false" @save="saveNote" :note="note"/>
            </div>
    </section>
    </section>
    `,
    data() {
        return {
        }
    },
    created() {
    },
    methods: {
        saveNote(note) {
            this.$emit('saveNote', note)
        },
        makeCopyNote(noteId) {
            this.$emit('copyNote' , noteId)
        }
    },
    computed: {
        unPinnedNotes() {
            if (this.notes) {
                return this.notes.filter(note => !note.isPinned)
            }
        },
        pinnedNotes() {
            if (this.notes) {
                return this.notes.filter(note => note.isPinned)
            }
        },
    },
    components: {
        NotePreview
    },
}