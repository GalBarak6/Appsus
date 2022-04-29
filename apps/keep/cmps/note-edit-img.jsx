import { NoteEditTxt } from './note-edit-txt.jsx'

export class NoteEditImg extends React.Component {

    state = {
        note: {
            type: 'note-img',
            info: {
                title: '',
                txt: '',
                url: '',
            },

            isPinned: false
        }
    }

    handleChange = ({ target }) => {
        const field = target.name
        console.log(field)
        const value = target.value
        this.setState((prevState) => (
            {
                note: {
                    ...prevState.note,
                    info: { ...prevState.note.info, [field]: value }
                }
            }
        ))
    }

    onSave = (ev) => {
        ev.preventDefault()
        console.log('onSave from note-edit-img', ev.target)
        this.props.onSaveNote(this.state.note)
    }

    render() {

        const { title, txt } = this.state.note.info
        var className
        if (this.props.selectedNote) className = 'note-edit-modal'

        return <section className="note-edit-container">
            <section className="note-edit-img">
                <div className="img-container">
                    <button>Upload</button>
                </div>
                <div className={"note-edit-txt " + className}>
                    <form onSubmit={this.onSave}>
                        <div>
                            <input className="input-size" type=" text" name="title" placeholder="Title"
                                value={title} onChange={this.handleChange} />
                            <button type="button">Pin</button>
                        </div>
                        <div>
                            <textarea className="textarea-size" name="txt" placeholder="Take a note..."
                                value={txt} onChange={this.handleChange} />
                        </div>
                        <div>
                            <button type="button" onClick={this.onSetColor}>background</button>
                            <button>Close</button>
                        </div>
                    </form>
                </div>
            </section>

            {/* <NoteEditTxt onSaveNote={this.props.onSaveNote} selectedNote={this.props.selectedNote}/> */}

        </section>

    }
}
