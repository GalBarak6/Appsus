export function NoteImg({ note }) {
    const {info} = note
    
    return <section className="note-img">
        <div className="img-container"></div>
        <div  className="title">{info.title}</div>
        <div>{info.txt}</div>
    </section>
}