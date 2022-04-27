export function NoteImg({ note }) {
    const {info} = note
    
    return <section className="note-img">
        <div>{note.id}</div>
        <div>{info.title}</div>
        <div>{info.url}</div>
        
    </section>
}