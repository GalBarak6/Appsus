import { noteService } from "../apps/keep/services/note.service.js"
import { NoteList } from "../apps/keep/cmps/note-list.jsx"
import { NoteFilter } from "../apps/keep/cmps/note-filter.jsx"
import { NoteEdit } from "../apps/keep/cmps/note-edit.jsx"


export class Keep extends React.Component {
    state = {
        notes: [],
        filterBy: null,
        isModalOpen: false,
        selectedNote: null
    }

    componentDidMount() {
        this.loadNotes()
    }

    loadNotes = () => {
        noteService.query(this.state.filterBy)
            .then(notes => {
                console.log('loadNotes', notes)
                this.setState({ notes })
            })
    }

    onSaveNote = (note) => {
        console.log('onSaveNote', note)
        noteService.saveNote(note)
            .then(() => {
                if (this.state.isModalOpen){
                    this.setState({ isModalOpen: false, selectedNote: null })
                    this.loadNotes()
                }else{
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

    // onUpdateNote = (note) => {
    //     console.log('onUpdateNote', note)
    //     this.setState({ isModalOpen: true, selectedNote: note })
    // }

    onCheck = (note) => {
        console.log('check from keep', note)
    }

    onSetFilter = (filterBy) => {
        console.log(filterBy);
        this.setState({ filterBy }, () => {
            console.log(this.state.filterBy);
            this.loadNotes()
        })
    }

    render() {
        const { notes, isModalOpen } = this.state

        var className

        return <section className="note-app">
            <NoteFilter onSetFilter={this.onSetFilter} />
            <NoteEdit onSaveNote={this.onSaveNote} />
            <NoteList notes={notes} onRemoveNote={this.onRemoveNote}
                onSaveNote={this.onSaveNote} onCheck={this.onCheck} />
            {isModalOpen && <div className="note-edit-modal ">
                <NoteEdit onSaveNote={this.onSaveNote} selectedNote={this.state.selectedNote} />
            </div>

            }
        </section>
    }
}
