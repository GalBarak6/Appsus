import { storageService } from '../../../services/storage.service.js'
import { utilService } from '../../../services/util.service.js'

export const noteService = {
    query
}

const KEY = 'noteDB'

let gNotes = []

function query() {
    var notes = _loadFromStorage()
    if (!notes) {
        notes = _createNotes()
        gNotes = notes
        _saveToStorage()
    }

    console.log(notes)
    return Promise.resolve(notes)
}

function _createNotes() {

    const notes = [
        {
            id: "n101",
            type: "note-txt",
            isPinned: true,
            info: {
                txt: "Fullstack Me Baby!"
            }
        },

        {
            id: "n104",
            type: "note-txt",
            isPinned: true,
            info: {
                txt: "Fullstack Me Baby!Fullstack Me Baby!Fullstack Me Baby!"
            }
        },
        {
            id: "n102",
            type: "note-img",
            info: {
                url: "http://some-img/me",
                title: "Bobi and Me"
            },
            style: {
                backgroundColor: "#00d"
            }
        },
        {
            id: "n103",
            type: "note-todos",
            info: {
                label: "Get my stuff together",
                todos: [
                    { txt: "Driving liscence", doneAt: null },
                    { txt: "Coding power", doneAt: 187111111 }
                ]
            }
        }
    ]
    return notes
}

function _createNote(type, info, style, isPinned = false) {

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


