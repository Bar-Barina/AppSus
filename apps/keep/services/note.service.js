import { utilService } from "../../../services/util.service.js"
import { storageService } from "../../../services/async-storage.service.js"

const NOTE_KEY = 'notesDB'

export const noteService = {
    query,
    get,
    remove,
    save,
    getEmptyNote,
    createNoteTxt,
    createNoteList,
    createNoteImg,
    createNoteCanvas,
    createNoteRecording,
    createNoteMap,
}
const colors = ['#f28b82', '#fbbc04', '#fff475', '#ccff90',
'#a7ffeb', '#cbf0f8', '#aecbfa', '#d7aefb', '#fdcfe8', '#e6c9a8', '#e8eaed']
const notes = [
    {
        id: 'n101',
        createdAt: 1112222,
        type: 'NoteTxt',
        isPinned: true,
        style: {
            backgroundColor: '#f28b82'
        },
        info: {
            title: `The first note!`,
            txt: `Hi , I'm the first note that Dor and Bar ever did in their life. never thought they can make me but they did!!!`
        }
    },
    {
        id: 'n102',
        type: 'NoteImg',
        isPinned: true,
        info: {
            url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
            title: 'Many colors',
            txt: 'Food is treated in a number of articles. For a description of the processes of absorption and utilization of food, see nutrition; nutrition, human; digestion; and digestive system, human.'
        },
        style: {
            backgroundColor: '#fbbc04'
        }
    },
    {
        id: 'n103',
        type: 'NoteTodos',
        isPinned: false,
        info: {
            title: 'Get my stuff together',
            todos: [
                { txt: 'Driving license', doneAt: null },
                { txt: 'Coding power', doneAt: 187111111 }
            ]
        },
        style: {
            backgroundColor: '#fff475'
        }
    },
    {
        id: 'n104',
        type: 'NoteVideo',
        isPinned: false,
        info: {
            url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
            title: 'A new video',
            txt: 'I am just a normal video in a note, not that you never seen one of those'
        },
        style: {
            backgroundColor: '#ccff90'
        }
    },
    {
        id: 'n105',
        type: 'NoteAudio',
        isPinned: false,
        info: {
            audioUrl: `http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/theme_01.mp3`,
            title: 'Dancing sound',
            txt: 'In physics, sound is a vibration that propagates as an acoustic wave, through a transmission medium such as a gas, liquid or solid. In human physiology and psychology, sound is the reception of such waves and their perception by the brain'
        },
        style: {
            backgroundColor: '#a7ffeb'
        }
    },
    {
        id: 'n106',
        type: 'NoteMap',
        isPinned: false,
        info: {
            coords: {lat: 40.712 , lng: -74},
            title: 'New york',
            txt: 'New York, often called New York City[a] or NYC, is the most populous city in the United States. With a 2020 population of 8,804,190 distributed over 300.46 square miles'
        },
        style: {
            backgroundColor: '#e6c9a8'
        }
    },
    {
        id: 'n114',
        type: 'NoteImg',
        isPinned: false,
        info: {
            url: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
            title: 'BBQ',
            txt: 'This was especially the case during the early phases of European trade and colonial expansion, when foods such as the hot red pepper, corn (maize), and sweet potatoes spread throughout Europe to Africa and Asia.'
        },
        style: {
            backgroundColor: '#a7ffeb'
        }
    },
    {
        id: 'n113',
        type: 'NoteImg',
        isPinned: false,
        info: {
            url: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=780&q=80',
            title: 'Yummy',
            txt: 'Hunting and gathering, horticulture, pastoralism, and the development of agriculture are the primary means by which humans have adapted to their environments to feed themselves. Food has long served as a carrier of culture in human societies and has been a driving force for globalization. '
        },
        style: {
            backgroundColor: '#fff475'
        }
    },
    {
        id: 'n112',
        type: 'NoteImg',
        isPinned: false,
        info: {
            url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80',
            title: 'Healthy food',
            txt: 'and other nutrients used in the body of an organism to sustain growth and vital processes and to furnish energy. The absorption and utilization of food by the body is fundamental to nutrition and is facilitated by digestion. '
        },
        style: {
            backgroundColor: '#aecbfa'
        }
    },
    {
        id: 'n111',
        type: 'NoteMap',
        isPinned: true,
        info: {
            coords: {lat: 32.08 , lng: 34.81},
            title: 'My work',
            txt: 'Coding academy in Ramat-Gan'
        },
        style: {
            backgroundColor: '#ccff90'
        }
    },
    {
        id: 'n124',
        type: 'NoteImg',
        isPinned: true,
        info: {
            url: 'https://images.unsplash.com/photo-1518057111178-44a106bad636?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=988&q=80',
            title: 'My coffee',
            txt: 'Coffee is a drink prepared from roasted coffee beans. Darkly colored, bitter, and slightly acidic, coffee has a stimulating effect on humans, primarily due to its caffeine content. '
        },
        style: {
            backgroundColor: '#e6c9a8'
        }
    },
]

makeNotes()
function makeNotes() {
    if (!utilService.loadFromStorage(NOTE_KEY)) utilService.saveToStorage(NOTE_KEY, notes)
    else return
}

function query(filterBy = {}) {
    return storageService.query(NOTE_KEY)
}

function get(noteId) {
    return storageService.get(NOTE_KEY, noteId)
}

function remove(noteId) {
    return storageService.remove(NOTE_KEY, noteId)
}

function save(note) {
    if (note.id) {
        return storageService.put(NOTE_KEY, note)
    } else {
        return storageService.post(NOTE_KEY, note)
    }
}

function getEmptyNote() {
    return {
        id: '', info: { txt: '' },
        style: { backgroundColor: '#fff' }, isPinned: false,
        type: 'NoteTxt'
    }
}

function createNoteTxt(note) {
    const newNote = getEmptyNote()
    newNote.info.txt = note.txt
    newNote.type = note.noteType
    newNote.info.title = note.title
    return storageService.post(NOTE_KEY, newNote)
}

function createNoteList(note) {
    const newNote = getEmptyNote()
    const list = note.txt.split(',')
    newNote.info.todos = list.map(txt => ({txt: txt, doneAt: null})) 
    newNote.type = note.noteType
    newNote.info.title = note.title
    return storageService.post(NOTE_KEY, newNote)
}

function createNoteImg(note) {
    const newNote = getEmptyNote()
    newNote.type = note.noteType
    newNote.info.url = note.url
    newNote.info.title = note.title
    newNote.info.txt = note.txt
    return storageService.post(NOTE_KEY, newNote)
}

function createNoteCanvas(note) {
    const newNote = getEmptyNote()
    newNote.type = 'MakeCanvas'
    newNote.info.canvasUrl = note.canvasUrl
    newNote.info.title = note.title
    newNote.info.txt = note.txt
    return storageService.post(NOTE_KEY, newNote)
}

function createNoteRecording(note) {
    const newNote = getEmptyNote()
    newNote.type = 'NoteAudio'
    newNote.info.audioUrl = note.audioUrl
    newNote.info.title = note.title
    newNote.info.txt = note.txt
    return storageService.post(NOTE_KEY, newNote)
}

function createNoteMap(note) {
    const newNote = getEmptyNote()
    newNote.type = 'NoteMap'
    newNote.info.coords = note.coords
    newNote.info.title = note.title
    newNote.info.txt = note.txt
    return storageService.post(NOTE_KEY, newNote)
}