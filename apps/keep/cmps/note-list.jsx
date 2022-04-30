import { NotePreview } from './note-preview.jsx'

export class NoteList extends React.Component {

    onRemoveNote = (note) => {
        this.props.onRemoveNote(note)
    }

    render() {

        const { notes } = this.props
        console.log('render list', notes)

        return <section className="note-list">
            {notes.map(note => <NotePreview key={note.id} note={note}
                onRemoveNote={this.onRemoveNote} 
                onEdit={this.props.onEdit}
                onEditColor={this.props.onEditColor}
                onCheck={this.props.onCheck} onCopy={this.props.onCopy} 
                onPin={this.props.onPin} onUnPin={this.props.onUnPin}/>
                
                )}
        </section>
    }
}