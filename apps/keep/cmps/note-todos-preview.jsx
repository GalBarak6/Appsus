

export function NoteTodosPreview({ todo }) {
    const { txt } = todo

    return <section className="note-todos-preview">
        {txt}

    </section>
}