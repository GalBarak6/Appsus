import { noteService } from "../apps/keep/services/note.service.js"
import { NoteList } from "../apps/keep/cmps/note-list.jsx"


export class Keep extends React.Component {
    state = {
        notes: []
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
            <NoteList notes={notes} />
        </section>
    }
}
