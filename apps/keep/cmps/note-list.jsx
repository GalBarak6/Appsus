import { NotePreview } from './note-preview.jsx'

export class NoteList extends React.Component {
    // state = {
    //     notes: this.props.notes
    // }

    onRemoveNote = (note) => {
        console.log('onRemoveNote')
        this.props.onRemoveNote(note)
    }

    onUpdateNote = (note) => {
        console.log('onUpdateNote')
        this.props.onSaveNote(note)
    }


    render() {

        const { notes } = this.props
        // const { notes } = this.state
        console.log('render list', notes)

        return <section className="note-list">
            {notes.map(note => <NotePreview key={note.id} note={note}
                onRemoveNote={this.onRemoveNote} onUpdateNote={this.onUpdateNote} 
                onCheck={this.props.onCheck} onCopy={this.props.onCopy} onPin={this.props.onPin} onUnPin={this.props.onUnPin}/>)}
        </section>



    }
}