import { ColorInput } from './dynamic-inputs/color-input.jsx'

export class NoteEditTxt extends React.Component {

    state = {
        note: {
            type: 'note-txt',
            info: {
                title: '',
                txt: '',
            },

            isPinned: false
        }
    }

    isSetColorOn = false

    componentDidMount() {
        this.loadNote()
    }

    loadNote = () => {
        console.log('loadNote')
        const note = this.props.selectedNote
        if (!note) return
        this.setState({ note })
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
        console.log('onSave', ev.target)
        this.props.onSaveNote(this.state.note)
        // this.clearNote()
    }

    // clearNote = () => {
    //     console.log('clearNote')
    //     this.setState({

    //         note: {
    //             type: 'note-txt',
    //             info: {
    //                 title: '',
    //                 txt: '',
    //             },
    //             isPinned: false
    //         }
    //     })
    // }

    onSetColor = () => {
        console.log('onSetColor')
        this.isSetColorOn = true
    }


    render() {
        const { title, txt } = this.state.note.info
        var className
        if (this.props.selectedNote) className = 'note-edit-modal'

        return <section className="note-edit-container" >
            <section className="note-edit-txt">
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
            <ColorInput />
        </section>
    }
}