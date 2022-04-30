export function NoteImg({ note }) {
    const { info } = note

    return <section className="note-img flex column space-between">
        <div className="img-container">
            <img src="assets/img/3.jpg" />
        </div>
        <div className="title">{info.title}</div>
        <div>{info.txt}</div>
    </section>
}