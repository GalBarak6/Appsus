import { storageService } from '../../../services/storage.service.js'
import { utilService } from '../../../services/util.service.js'

export const noteService = {
    query,
    saveNote,
    removeNote,
    copyNote,
    getPinnedNotes,
    pinNote,
    onDone
}

const KEY = 'noteDB'
let gNotes

function query(filterBy) {
    var notes = _loadFromStorage()
    if (!notes) {
        notes = _createNotes()
    }
    gNotes = notes
    _saveToStorage()

    notes = notes.filter(note => note.isPinned === false)

    if (filterBy) {
        let { search, type } = filterBy
        notes = notes.filter(note => {
            return ((note.info.title.toLowerCase().includes(search.toLowerCase()) ||
                note.info.txt.toLowerCase().includes(search.toLowerCase())
            )) && (note.type === type || type === 'all')
        })
    }
    var pinnedNotes = getPinnedNotes()
    return Promise.resolve({ notes, pinnedNotes })
}

function getPinnedNotes() {
    var notes = gNotes.filter(note => note.isPinned)
    return notes
}

function saveNote(note) {
    if (note.id) _updateNote(note)
    else _addNote(note)
    return Promise.resolve()
}

function _addNote(note) {
    note.id = utilService.makeId()
    gNotes.push(note)
    _saveToStorage()
}

function removeNote(noteId) {
    const noteIdx = gNotes.findIndex(note => note.id === noteId)
    gNotes.splice(noteIdx, 1)
    _saveToStorage()
    return Promise.resolve()
}

function _updateNote(noteToUpdate) {
    gNotes = gNotes.map(note => note.id === noteToUpdate.id ? noteToUpdate : note)
    _saveToStorage()
}

function copyNote(note) {
    const { type, info, style } = note
    var copy = _createNote(type, info, style)
    gNotes.push(copy)
    _saveToStorage()
    return Promise.resolve()
}

function pinNote(note, isPinned) {
    note.isPinned = isPinned
    _updateNote(note)

}

function onDone(note, todo) {
    const todoIdx = note.info.todos.findIndex(todoNew => todo.txt === todoNew.txt)
    if (!todo.doneAt) note.info.todos[todoIdx].doneAt = Date.now()
    else note.info.todos[todoIdx].doneAt = ''
    _updateNote(note)
}


function _createNotes() {

    const notes = [
        {
            id: "n101",
            type: "note-txt",
            isPinned: false,
            info: {
                title: 'MEETING',
                txt: "15.5 At 20:30"
            },
            style: {
                backgroundColor: '#42C2FF'
            }
        },
        {
            id: "n107",
            type: "note-txt",
            isPinned: true,
            info: {
                title: 'YOGA',
                txt: "At 20:30"
            },
            style: {
                backgroundColor: '#B4FF9F'
            }
        },

        {
            id: "n104",
            type: "note-txt",
            isPinned: false,
            info: {
                title: 'REMINDER',
                txt: "Pick up the cake"
            },
            style: {
                backgroundColor: '#FFD59E'
            }
        },

        {
            id: "n102",
            type: "note-img",
            info: {
                url: "assets/img/3.jpg",
                title: "Hazafon",
                txt: "Feb 2022"
            },
            isPinned: true,
            style: {
                // backgroundColor: '#FF6FB5'
                backgroundColor: ''
            }
        },
        {
            id: "n105",
            type: "note-img",
            info: {
                url: "assets/img/2.jpg",
                title: "Jonni and Lola",
                txt: "Feb 2022"
            },
            isPinned: false,
            style: {
                backgroundColor: '#FFA1A1'
            }
        },
        {
            id: "n103",
            type: "note-todos",
            info: {
                title: 'TODOS',
                txt: "todos note",
                label: "Get my stuff together",
                todos: [
                    { txt: "Driving liscence", doneAt: null },
                    { txt: "Coding power", doneAt: 187111111 }
                ]
            },
            isPinned: true,
            style: {
                backgroundColor: '#FF6FB5'
            }
        },
        {
            id: "n106",
            type: "note-todos",
            info: {
                title: 'Sprint',
                txt: "todos note",
                label: "Get my stuff together",
                todos: [
                    { txt: "Todo CRUD", doneAt: null },
                    { txt: "Add modal", doneAt: 187111111 },
                    { txt: "Fix bugs", doneAt: 187111111 }
                ]
            },
            isPinned: true,
            style: {
                backgroundColor: '#B8FFF9'
            }
        },

        {
            id: "n108",
            type: "note-img",
            info: {
                url: "assets/img/4.jpg",
                title: "So cute ",
                txt: ""
            },
            isPinned: false,
            style: {
                backgroundColor: '#AB46D2'
            }
        },
    ]
    return notes
}

function _createNote(type, info, style = {}, isPinned = false) {

    return {
        id: utilService.makeId(),
        type,
        isPinned,
        info,
        style
    }
}

function _createInfo(txt, url, title, label, todos) {
    return {
        txt: '',
        url: '',
        title: '',
        label: '',
        todos: []
    }
}

function _saveToStorage() {
    storageService.saveToStorage(KEY, gNotes)
}

function _loadFromStorage() {
    return storageService.loadFromStorage(KEY)
}


