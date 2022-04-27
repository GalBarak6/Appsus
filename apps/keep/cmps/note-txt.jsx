

export function NoteTxt({ note }) {
    const {info} = note
    
    return <section className="note-txt">
        <div  className="title">{info.title}</div>
        <div>{info.txt}</div>
        
    </section>
}
