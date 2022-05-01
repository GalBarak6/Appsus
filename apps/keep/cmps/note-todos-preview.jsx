

export function NoteTodosPreview({ note, todo, onDone }) {
    var className
    if (todo.doneAt) className = "done"
    return <section className="note-todos-preview">
        <input type="checkbox" id="checkbox" onChange={() => { onDone(note, todo) }} />
        <label htmlFor="checkbox" className={"todo-label " + className} onClick={() => { onDone(note, todo) }}>{todo.txt}</label>
    </section>

}