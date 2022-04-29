

export function NoteTodosPreview({ todo }) {
  
        console.log('TodoPreview', todo)
        return <section className="note-todos-preview">
            <input type="checkbox" id="checkbox" />
            <label htmlFor="checkbox" >{todo.txt}</label>
        </section>
    
}