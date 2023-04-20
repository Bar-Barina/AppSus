import NoteList from "../cmps/NoteList.js"
import NoteEditor from "../cmps/NoteEditor.js"
import MakeNote from "../cmps/MakeNote.js"
import NoteFilter from "../cmps/NoteFilter.js"
import NoteSidebar from "../cmps/NoteSidebar.js"

import { noteService } from "../services/note.service.js"
import { eventBus } from "../../../services/event-bus.service.js"

export default {
    name: 'NoteIndex',
    emits: ['noteUpdated'],
    template: `
    <section class="main-layout">
    <NoteSidebar :filterBy="filterBy"/>
    <section class="note-index">
    <NoteFilter v-if="searchOpen" @filter="setFilterBy"
    @closeSearch="this.searchOpen = false"/>
    <MakeNote  @addedNote="loadNotes"/>
    <NoteList 
    @copyNote="makeCopy"
    @saveNote="save"
    :notes="notesToPreview"/>
    <RouterView />
    </section>
    </section>
    `,
    data() {
        return {
            notes: null,
            filterBy: {},
            searchOpen: false
        }
    },
    created() {
        eventBus.on('search', (txt) => this.filterBy.txt = txt)
        eventBus.on('filterByType', (type) => this.filterBy.noteType = type)
        eventBus.on('updateNoteInfo', (changeObj) => this.update(changeObj))
        eventBus.on('removeNote', (noteId) => this.removeNote(noteId))
        this.loadNotes()
    },
    methods: {
        removeNote(noteId) {
            noteService.remove(noteId)
                .then(() => {
                    const idx = this.notes.findIndex(note => note.id === noteId)
                    this.notes.splice(idx, 1)
                    eventBus.emit('show-msg', { txt: 'Note removed', type: 'success' })
                })
        },
        loadNotes() {
            noteService.query()
                .then(notes => this.notes = notes)
        },
        save(note) {
            return noteService.save(note)
        },
        makeCopy(noteId) {
            const note = this.notes.find(note => note.id === noteId)
            const newNote = JSON.parse(JSON.stringify(note))
            newNote.id = null
            this.save(newNote)
                .then(this.loadNotes)
        },
        update(changeObj) {
            const note = this.notes.find(note => note.id === changeObj.noteId)
            note[changeObj.key] = changeObj.toUpdate
            noteService.save(note)
        },
        setFilterBy(filterBy) {
            this.filterBy = filterBy
            console.log('this.filterBy', this.filterBy)
        },
    },
    computed: {
        notesToPreview() {
            if (this.notes) {
                const txtReg = new RegExp(this.filterBy.txt, 'i')
                const typeReg = new RegExp(this.filterBy.noteType, 'i')
                return this.notes.filter(note => txtReg.test(note.info.title)
                    && typeReg.test(note.type))
            }
        }
    },
    components: {
        NoteList,
        NoteEditor,
        MakeNote,
        NoteFilter,
        NoteSidebar
    }
}