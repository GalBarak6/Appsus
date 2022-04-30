import { TodoPreview } from "./todo-preview.jsx"

export class TodosList extends React.Component {

    render() {
        const { todos } = this.props
        console.log('render todos list', todos)

        return <section className="todos-list">
            {todos.map((todo, idx) => {return <TodoPreview key={idx} todo={todo}/>})}
        </section>
    }
}