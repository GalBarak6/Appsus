

export class NoteAddTxt extends React.Component {

    // state = {
    //     note: {
    //         type: 'note-txt',
    //         title: '',
    //         txt: '',
    //         isPinned: false
    //     }
    // }
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

    clearNote = () => {
        console.log('clearNote')
        this.setState({

            note: {
                type: 'note-txt',
                info: {
                    title: '',
                    txt: '',
                },

                isPinned: false
            }
        })
    }


    render() {
            const { title, txt } = this.state.note.info

        return <section className="note-add-txt">
            <form onSubmit={this.onSave}>
                <div>
                    <input type=" text" name="title" placeholder="Title"
                        value={title} onChange={this.handleChange} />
                    <button>Pin</button>
                </div>
                <div>
                    <textarea name="txt" placeholder="Take a note..."
                        value={txt} onChange={this.handleChange} />
                </div>
                <div>
                    <button>background</button>
                    <button>close</button>
                </div>
            </form>

        </section>

    }


}