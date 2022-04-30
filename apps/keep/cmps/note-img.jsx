export function NoteImg({ note }) {
    const { info } = note

    return <section className="note-img flex column space-between">
        <div className="img-container">
            {/* <img src="assets/img/3.jpg" /> */}
            <img src={info.url} />
        </div>
    </section>
}