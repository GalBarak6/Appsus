import { NotePreview } from './note-preview.jsx'

export class NoteList extends React.Component {
    state = {

    }

    onRemoveNote = (note) => {
        console.log('onRemoveNote')
        this.props.onRemoveNote(note)
    }


    render() {

        const { notes } = this.props

        return <section className="note-list">
            {notes.map(note => <NotePreview key={note.id} note={note} onRemoveNote={this.onRemoveNote} />)}
        </section>



    }
}