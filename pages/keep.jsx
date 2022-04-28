import { noteService } from "../apps/keep/services/note.service.js"
import { NoteList } from "../apps/keep/cmps/note-list.jsx"
import { NoteFilter } from "../apps/keep/cmps/note-filter.jsx"
import { NoteEdit } from "../apps/keep/cmps/note-edit.jsx"
import { NoteEditTxt } from "../apps/keep/cmps/note-edit-txt.jsx"


export class Keep extends React.Component {
    state = {
        notes: [],
        pinnedNotes:[],
        filterBy: null,
        isModalOpen: false,
        selectedNote: null
    }

    componentDidMount() {
        this.loadNotes()
    }

    // loadNotes = () => {
    //     noteService.query(this.state.filterBy)
    //         .then(notes => {
    //             console.log('loadNotes', notes)
    //             this.setState(prevState => ({ ...prevState, notes }))
    //         })
    // }
    loadNotes = () => {
        noteService.query(this.state.filterBy)
            .then(res => {
                const {notes ,pinnedNotes} = res
                console.log('loadNotes', notes)
                this.setState(prevState => ({ ...prevState, notes ,pinnedNotes }))
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
        console.log('onSaveNote', note)
        noteService.saveNote(note)
            .then(() => {
                if (this.state.isModalOpen) {
                    this.setState({ isModalOpen: false, selectedNote: null })
                    this.loadNotes()
                } else if (!this.state.isModalOpen && !this.state.selectedNote) {
                    this.setState({ isModalOpen: true, selectedNote: note })
                    this.loadNotes()
                }
            })
    }

    onRemoveNote = (note) => {
        console.log('onRemoveNote', note)
        noteService.removeNote(note.id)
        this.loadNotes()
    }

    onCheck = (note) => {
        console.log('check from keep', note)
    }

    onCopy = (note) => {
        console.log('onCopy from keep', note)
        noteService.copyNote(note)
        this.loadNotes()
    }

    onPin = (note) => {
        console.log('onPin from keep', note)
        noteService.pinNote(note, true)
        this.loadNotes()
    }

    onUnPin = (note) => {
        console.log('onUnPin from keep', note)
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
            <NoteList notes = {pinnedNotes} onRemoveNote={this.onRemoveNote}
                onSaveNote={this.onSaveNote} onCopy={this.onCopy} onPin={this.onPin} onUnPin={this.onUnPin}/>
                <hr></hr>
            <NoteList notes={notes} onRemoveNote={this.onRemoveNote}
                onSaveNote={this.onSaveNote} onCheck={this.onCheck} onCopy={this.onCopy} onPin={this.onPin}/>
            {isModalOpen && <div className="note-edit-modal ">
                {/* <NoteEdit onSaveNote={this.onSaveNote} selectedNote={this.state.selectedNote} /> */}
                <NoteEditTxt onSaveNote={this.onSaveNote} selectedNote={this.state.selectedNote} />
            </div>

            }
        </section>
    }
}
