

export class TodoPreview extends React.Component{

    render() {
        return <section className="todo-preview">
            <input type="checkbox" id="checkbox" />
            <label htmlFor ="checkbox" >{this.props.todo.txt}</label>
        </section>
    }
}