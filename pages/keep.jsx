import { noteService } from "../apps/keep/services/note.service.js"
import { NoteList } from "../apps/keep/cmps/note-list.jsx"
import { NoteFilter } from "../apps/keep/cmps/note-filter.jsx"
import { NoteEdit } from "../apps/keep/cmps/note-edit.jsx"
import { NoteEditTxt } from "../apps/keep/cmps/note-edit-txt.jsx"
import { NoteEditImg } from "../apps/keep/cmps/note-edit-img"
import { eventBusService } from "../../../services/event-bus-service.js"
import { NoteEditTodos } from "../apps/keep/cmps/note-edit-todos.jsx"


export class Keep extends React.Component {
    state = {
        notes: [],
        pinnedNotes: [],
        filterBy: null,
        isModalOpen: false,
        selectedNote: null
    }

    componentDidMount() {
        this.loadNotes()
    }

    loadNotes = () => {
        noteService.query(this.state.filterBy)
            .then(res => {
                const { notes, pinnedNotes } = res
                console.log('loadNotes', notes)
                this.setState(prevState => ({ ...prevState, notes, pinnedNotes }))
            })
    }

    loadPinnedNotes = () => {
        noteService.getPinnedNotes()
            .then(pinnedNotes => {
                console.log('loadPinnedNotes', pinnedNotes)
                this.setState(prevState => ({ ...prevState, pinnedNotes }))
            })
    }

    onSaveNote = (note) => {
        if ((note.type === 'note-txt' && !note.info.title && !note.info.txt)) return
        if ((note.type === 'note-img' && !note.info.title && !note.info.txt)) return

        if (note.type === 'note-todos' && !note.info.title && note.info.todos.length === 0) {
            console.log('length', note.info.todos.length)
            return
        }

        noteService.saveNote(note)
            .then(() => {
                if (this.state.isModalOpen) {
                    this.setState({ isModalOpen: false, selectedNote: null })
                    this.loadNotes()
                } else if (!this.state.isModalOpen && !this.state.selectedNote) {
                    this.loadNotes()
                }
                eventBusService.emit('user-msg', { type: 'success', txt: 'Note saved successfully' })
            })
            .catch(() => {
                eventBusService.emit('user-msg', {
                    type: 'danger', txt: 'Could not save note'
                })
            })
    }

    onEdit = (note) => {
        this.setState(prevState => ({ ...prevState, isModalOpen: true, selectedNote: note }))
    }

    onEditColor = (note, color) => {
        note.style= {'backgroundColor': color}
        this.onSaveNote(note)
    }

    onRemoveNote = (note) => {
        noteService.removeNote(note.id)
            .then(() => {
                eventBusService.emit('user-msg', { type: 'success', txt: 'Note deleted successfully' })
            })
            .catch(() => {
                eventBusService.emit('user-msg', {
                    type: 'danger', txt: 'Could not delete note'
                })
            })
        this.loadNotes()
    }

    onCopy = (note) => {
        noteService.copyNote(note)
            .then(() => {
                eventBusService.emit('user-msg', { type: 'success', txt: 'Note copied successfully' })
            })
            .catch(() => {
                eventBusService.emit('user-msg', {
                    type: 'danger', txt: 'Could not copy note'
                })
            })
        this.loadNotes()
    }

    onPin = (note) => {
        noteService.pinNote(note, true)
        this.loadNotes()
    }

    onUnPin = (note) => {
        noteService.pinNote(note, false)
        this.loadNotes()
    }

    onSetFilter = (filterBy) => {
        console.log(filterBy);
        this.setState({ filterBy }, () => {
            console.log(this.state.filterBy);
            this.loadNotes()
        })
    }

    render() {
        const { notes, isModalOpen, pinnedNotes } = this.state

        return <section className="note-app">
            <NoteFilter onSetFilter={this.onSetFilter} />
            <NoteEdit onSaveNote={this.onSaveNote} />
            <NoteList notes={pinnedNotes} onRemoveNote={this.onRemoveNote}
                onCopy={this.onCopy}
                onEdit={this.onEdit}
                onEditColor={this.onEditColor}
                onPin={this.onPin} onUnPin={this.onUnPin} />
            <hr></hr>
            <NoteList notes={notes} onRemoveNote={this.onRemoveNote}
                onCheck={this.onCheck}
                onEdit={this.onEdit}
                onEditColor={this.onEditColor}
                onCopy={this.onCopy} onPin={this.onPin} />
            {isModalOpen && <div className="note-edit-modal ">

                {this.state.selectedNote.type === 'note-txt' &&
                    <NoteEditTxt onSaveNote={this.onSaveNote} selectedNote={this.state.selectedNote} />
                }
                {this.state.selectedNote.type === 'note-img' &&
                    <NoteEditImg onSaveNote={this.onSaveNote} selectedNote={this.state.selectedNote} />
                }
                {this.state.selectedNote.type === 'note-todos' &&
                    <NoteEditTodos onSaveNote={this.onSaveNote} selectedNote={this.state.selectedNote} />
                }

            </div>

            }
        </section>
    }
}
