import { noteService } from '../services/note.service.js'
import { NoteEditTxt } from './note-edit-txt.jsx'
import { NoteEditImg } from './note-edit-img.jsx'
import { NoteEditTodos } from './note-edit-todos.jsx'

export class NoteEdit extends React.Component {
    state = {
        type: null,
        selectedNote: this.props.selectedNote
    }

    onAddNote = ({ target }) => {
        var type = target.name
        this.setState({ type })
    }
    onAddDefaultNote = () => {
        var type = 'note-txt'
        this.setState({ type })
    }

    onSaveNote = (note) => {
        console.log('onSaveNote', note)
        this.props.onSaveNote(note)
        this.setState({ type: null })
    }

    render() {
        console.log('selectedNode', this.state.selectedNote)
        const { type } = this.state

        return <section className="note-edit" >
            {!type && <div className="note-edit-container" >
                <div onClick={this.onAddDefaultNote}>
                    Take a note...
                </div>
                <div>
                    <img src="./assets/icons/plus.png" onClick={this.onAddNote} name="note-txt" />
                    <img src="./assets/icons/img.png" onClick={this.onAddNote} name="note-img" />
                    <img src="./assets/icons/todo.png" onClick={this.onAddNote} name="note-todos" />
                </div>
            </div>
            }
            {type && <DynamicCmp type={type} onSaveNote={this.onSaveNote} selectedNote={this.state.selectedNote} />}
        </section>
    }
}

function DynamicCmp(props) {
    switch (props.type) {
        case 'note-txt':
            return <NoteEditTxt {...props} />
        case 'note-img':
            return <NoteEditImg {...props} />
        case 'note-todos':
            return <NoteEditTodos {...props} />
        // case 'note-video':
        //     return <NoteEditVideo {...props} />
    }
}