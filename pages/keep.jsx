import { noteService } from "../apps/keep/services/note.service.js"
import { NoteList } from "../apps/keep/cmps/note-list.jsx"
import { NoteFilter } from "../apps/keep/cmps/note-filter.jsx"
import { NoteAdd } from "../apps/keep/cmps/note-add.jsx"


export class Keep extends React.Component {
    state = {
        notes: [],
        filterBy:null
    }

    componentDidMount() {
        this.loadNotes()
    }

    loadNotes = () => {
        noteService.query()
            .then(notes => {
                console.log(notes)
                this.setState({ notes })
            })
    }

    render() {
        const { notes } = this.state

        return <section className="note-app">
            <NoteFilter/>
            <NoteAdd/>
            <NoteList notes={notes} />
        </section>
    }
}
