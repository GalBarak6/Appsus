

export function NoteTxt({ note }) {
    const {info} = note
    
    return <section className="note-txt">
        <div>{note.id}</div>
        <div>{info.txt}</div>
        
    </section>
}


// id: "n101",
// type: "note-txt",
// isPinned: true,
// info: {
//     txt: "Fullstack Me Baby!"
// }