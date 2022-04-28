import { NoteTxt } from "./note-txt.jsx"
import { NoteImg } from "./note-img.jsx"
import { NoteTodos } from "./note-todos.jsx"

export class NotePreview extends React.Component {

    onRemoveNote = () => {
        console.log('onRemoveNote', this.props.note)
        this.props.onRemoveNote(this.props.note)
    }

    onUpdateNote = () => {
        console.log('onUpdateNote', this.props.note)
        this.props.onUpdateNote(this.props.note)
    }

    render() {
        const { note } = this.props
        const { type } = note
        const { isPinned } = note

        return <section className="note-preview">
            {isPinned && <div>
                <button onClick={() => { this.props.onUnPin(note) }}>UnPin</button>
            </div>}
            {!isPinned &&
                <div>
                    <button onClick={() => { this.props.onPin(note) }}>Pin</button>
                </div>
            }
            <DynamicCmp type={type} note={note} />

            <div>
                <button>background</button>
                <button onClick={this.onUpdateNote}>update</button>
                <button onClick={this.onRemoveNote}>delete</button>
                <button onClick={() => { this.props.onCheck(note) }}>check</button>
                <button onClick={() => { this.props.onCopy(note) }}>copy</button>
            </div>

        </section>

    }
}



function DynamicCmp(props) {
    switch (props.type) {
        case 'note-txt':
            return <NoteTxt {...props} />
        case 'note-img':
            return <NoteImg {...props} />
        case 'note-todos':
            return <NoteTodos {...props} />
        case 'note-video':
            return <NoteVideo {...props} />
    }
}