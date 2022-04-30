
import { ColorInput } from './dynamic-inputs/color-input.jsx'

export class NoteEditImg extends React.Component {

    state = {
        note: {
            type: 'note-img',
            info: {
                title: '',
                txt: '',
                url: '',
            },
            
            isPinned: false,
            style:{
                backgroundColor:''
            }
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

    handleStyleChange = (field, value) => {
        console.log('handleStyleChange')
        console.log('field',field)
        console.log('value', value)

        this.setState((prevState) => (
             {
                note: {
                    ...prevState.note,
                    style: { ...prevState.note.style, [field]: value }
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
        const {style} = this.state.note

        const { title, txt } = this.state.note.info
        var className
        if (this.props.selectedNote) className = 'note-edit-modal'

        return <section style={style} className="note-edit-container">
            <section className="note-edit-img">
                <div className="img-container">
                    <button>Upload</button>
                </div>
                <div className={"note-edit-img "}>
                    <form onSubmit={this.onSave}>
                        <div className="flex space-between" >
                            <input style={style} className="no-border input-size" type=" text" name="title" placeholder="Title"
                                value={title} onChange={this.handleChange} />
                            <img src="./assets/icons/pin.png" />
                            {/* <button type="button">Pin</button> */}
                        </div>
                        <div>
                            <textarea style={style} className="no-rezise no-border textarea-size" name="txt" placeholder="Take a note..."
                                value={txt} onChange={this.handleChange} />
                        </div>
                        <div  className="flex space-between">
                            <img src="./assets/icons/colors.png" onClick={this.onSetColor} />
                            {/* <button type="button" onClick={this.onSetColor}>background</button> */}
                            <button>Close</button>
                        </div>
                    </form>
                </div>
            </section>

            <ColorInput handleStyleChange={this.handleStyleChange}/>
        </section>

    }
}
