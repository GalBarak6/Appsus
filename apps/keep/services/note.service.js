import { storageService } from '../../../services/storage.service.js'
import { utilService } from '../../../services/util.service.js'

export const noteService = {
    query,
    saveNote,
    removeNote,
    copyNote,
    getPinnedNotes, 
    pinNote
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

    notes = notes.filter(note => note.isPinned ===false )

    if (filterBy) {
        let { search, type } = filterBy
        console.log(search);
        console.log(type);
        notes = notes.filter(note => {
            return ((note.info.title.toLowerCase().includes(search.toLowerCase()) ||
                note.info.txt.toLowerCase().includes(search.toLowerCase())
            )) && (note.type === type || type === 'all')
        })
    }
    var pinnedNotes = getPinnedNotes()

    console.log(notes)
    return Promise.resolve({notes, pinnedNotes})
}

function getPinnedNotes() {
    var notes = gNotes.filter(note => note.isPinned)
    console.log('getPinnedNotes', notes)
    return notes
    // return Promise.resolve(notes)
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
    console.log('updateNote')
    gNotes = gNotes.map(note => note.id === noteToUpdate.id ? noteToUpdate : note)
    _saveToStorage()
    // return Promise.resolve()

}

function copyNote(note) {
    console.log('copyNote')
    const { type, info } = note
    var copy = _createNote(type, info)
    gNotes.push(copy)
    _saveToStorage()
}

function pinNote(note, isPinned){
    console.log('pinNote')
    note.isPinned = isPinned
    _updateNote(note)
}


function _createNotes() {

    const notes = [
        {
            id: "n101",
            type: "note-txt",
            isPinned: true,
            info: {
                title: 'TEST',
                txt: "Fullstack Me Baby!"
            }
        },

        {
            id: "n104",
            type: "note-txt",
            isPinned: false,
            info: {
                title: 'TEXT',
                txt: "Fullstack Me Baby!Fullstack Me Baby!Fullstack Me Baby!"
            }
        },

        {
            id: "n102",
            type: "note-img",
            info: {
                url: "http://some-img/me",
                title: " IMAGE Bobi and Me",
                txt: "Image note"
            },
            isPinned: true,
            style: {
                backgroundColor: "#00d"
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
            isPinned: false,
        }
    ]
    return notes
}

function _createNote(type, info, isPinned = false) {

    return {
        id: utilService.makeId(),
        type,
        isPinned,
        info,
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


