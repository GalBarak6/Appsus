// import { ColorInput } from './dynamic-inputs/color-input.jsx'
import { TodosList } from "./todos-list.jsx"

export class NoteEditTodos extends React.Component {

    state = {
        note: {
            type: 'note-todos',
            info: {
                title: '',
                todos: [],
                todo:'',
                // todos: [
                //     { txt: "Driving liscence", doneAt: null },
                //     { txt: "Coding power", doneAt: 187111111 }
                // ]
            },
            isPinned: false
        }
    }

    // isSetColorOn = false

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
        console.log('field', field)
        const value = target.value
        console.log('value', value)
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
    }

    onSetColor = () => {
        console.log('onSetColor')
        this.isSetColorOn = true
    }

    convertTxtToToDo(txt){
        return  { txt: txt, doneAt: null }

    }

    onAddTodo = ()=>{
        var {todo} = this.state.note.info
        console.log('onAddTodo',todo)
        todo = this.convertTxtToToDo(todo)
        console.log('after convert',todo)
        this.setState((prevState) => (
            {
                note: {
                    ...prevState.note,
                    info: { ...prevState.note.info, todos: [...prevState.note.info.todos, todo] , todo:''}
                }
            }
        ))

    }

    render() {
        const { title, todo, todos } = this.state.note.info
        console.log('todos', todos)
        var className
        if (this.props.selectedNote) className = 'note-edit-modal'

        return <section className="note-edit-container" >
            <section className="note-edit-todos">
                <div className={"note-edit-todos "}>
                    <form onSubmit={this.onSave}>
                        <div>
                            <input className="input-size" type=" text" name="title" placeholder="Title"
                                value={title} onChange={this.handleChange} />
                            <button type="button">Pin</button>
                        </div>
                        <div className="todos-list-container">
                            <TodosList todos={todos} onAddTodo={this.onAddTodo}/>
                        </div>
                        <div>
                            <button type="button" onClick={this.onAddTodo}>+</button>
                            <input className="input-size" type=" text" name="todo" placeholder="List item"
                                value={todo} onChange={this.handleChange} />
                        </div>
                        <div>
                            <button type="button" onClick={this.onSetColor}>background</button>
                            <button>Close</button>
                        </div>

                    </form>
                </div>
            </section>
            {/* <ColorInput /> */}
        </section>
    }
}