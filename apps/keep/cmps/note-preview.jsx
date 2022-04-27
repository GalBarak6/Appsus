import { NoteTxt } from "./note-txt.jsx"
import { NoteImg } from "./note-img.jsx"
import { NoteTodos } from "./note-todos.jsx"

export class NotePreview extends React.Component {

    state = {
        note: this.props.note
    }

    onRemoveNote = ()=>{
        console.log('onRemoveNote', this.state.note)
        this.props.onRemoveNote(this.state.note)
    }

    render() {
        const { note } = this.state
        const { type } = note

        return <section className="note-preview">
            <div>
                <button>Pin</button>
            </div>
            <DynamicCmp type={type} note={note} />

            <div>
                <button>background</button>
                <button onClick={this.onRemoveNote}>delete</button>
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