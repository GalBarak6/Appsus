import { ColorInput } from './dynamic-inputs/color-input.jsx'
import { TodosList } from "./todos-list.jsx"

export class NoteEditTodos extends React.Component {

    state = {
        note: {
            type: 'note-todos',
            info: {
                title: '',
                todos: [],
                todo: '',
            },
            isPinned: false,
            style: {
                backgroundColor: ''
            }
        },
        isSetColorOn: false
    }

    componentDidMount() {
        this.loadNote()
    }

    loadNote = () => {
        const note = this.props.selectedNote
        if (!note) return
        this.setState({ note })
    }

    handleChange = ({ target }) => {
        const field = target.name
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
        this.props.onSaveNote(this.state.note)
    }

    onSetColorOn = () => {
        this.setState({ isSetColorOn: true })
    }

    convertTxtToToDo(txt) {
        return { txt: txt, doneAt: null }
    }

    onAddTodo = () => {
        var { todo } = this.state.note.info
        todo = this.convertTxtToToDo(todo)
        this.setState((prevState) => (
            {
                note: {
                    ...prevState.note,
                    info: { ...prevState.note.info, todos: [...prevState.note.info.todos, todo], todo: '' }
                }
            }
        ))

    }

    onPin = () => {
        console.log('onPin')
        this.setState((prevState) => (
            {
                note: {
                    ...prevState.note,
                    isPinned: true
                }
            }
        ))
    }

    render() {
        const { style } = this.state.note
        const { title, todo, todos } = this.state.note.info
        console.log('todos', todos)
        var className
        if (this.props.selectedNote) className = 'note-edit-modal'

        return <section style={style} className="note-edit-container" >
            <section className="note-edit-todos">
                <div className={"note-edit-todos "}>
                    <form onSubmit={this.onSave}>
                        <div className="flex space-between">
                            <input style={style} className="no-border input-size" type=" text" name="title" placeholder="Title"
                                value={title} onChange={this.handleChange} />
                            <img src="./assets/icons/pin.png" onClick={this.onPin} />
                        </div>
                        <div className="todos-list-container">
                            <TodosList todos={todos} onAddTodo={this.onAddTodo} />
                        </div>
                        <div>
                            <button type="button" onClick={this.onAddTodo}>+</button>

                            <input style={style} className="no-rezise no-border textarea-size" type=" text" name="todo" placeholder="List item..."
                                value={todo} onChange={this.handleChange} />
                        </div>
                        <div className="flex space-between">
                            <div>
                                <img src="./assets/icons/colors.png" onClick={this.onSetColorOn} />
                                <img src="./assets/icons/plus.png" onClick={this.onAddTodo} />

                            </div>
                            {/* <button type="button" onClick={this.onAddTodo}>Add List item</button> */}
                            <button>Close</button>
                        </div>

                    </form>
                </div>
            </section>
            {this.state.isSetColorOn && <ColorInput handleStyleChange={this.handleStyleChange} />}

        </section>
    }
}