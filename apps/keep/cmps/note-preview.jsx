import { NoteTxt } from "./note-txt.jsx"
import { NoteImg } from "./note-img.jsx"
import { NoteTodos } from "./note-todos.jsx"

export class NotePreview extends React.Component {

    onRemoveNote = () => {
        console.log('onRemoveNote', this.props.note)
        this.props.onRemoveNote(this.props.note)
    }

    render() {
        const { note } = this.props
        const { type, style } = note
        const { isPinned } = note

        return <section style={style} className="note-preview flex space-between">
            <div className="flex space-between">
                <DynamicCmp type={type} note={note} />


            </div>

            <div className="icons flex space-between" >
                <img src="./assets/icons/colors.png" />
                <img src="./assets/icons/delete2.png" onClick={this.onRemoveNote} />
                {/* <button onClick={() => { this.props.onCheck(note) }}>Check</button> */}
                <img src="./assets/icons/copy.png" onClick={() => { this.props.onCopy(note) }} />
                <img src="./assets/icons/edit.png" onClick={() => { this.props.onEdit(note) }} />


                {isPinned && <div>
                    <img src="./assets/icons/unpin.png" onClick={() => { this.props.onUnPin(note) }} />
                </div>}
                {!isPinned &&
                    <div>
                        <img src="./assets/icons/pin.png" onClick={() => { this.props.onPin(note) }} />
                    </div>
                }

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