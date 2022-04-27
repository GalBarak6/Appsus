import {NoteAddTxt} from './note-add-txt.jsx'
export class NoteAdd extends React.Component {
    state = {
        type: null
    }

    onAddNote = ({ target }) => {
        var type = target.name
        this.setState({ type })
    }
    onAddDefaultNote = ()=>{
        var type = 'note-txt'
        this.setState({ type })
    }

    render() {
        const { type } = this.state

        return <section className="note-add" >
            {!type && <div className="note-add-container" >
                <div onClick={this.onAddDefaultNote}>
                    Take a note...
                </div>
                <div>
                    <button onClick={this.onAddNote} name="note-txt">txt</button>
                    <button onClick={this.onAddNote} name="note-img">Img</button>
                    <button onClick={this.onAddNote} name="note-todos">todos</button>
                </div>
            </div>
            }
            {type && <DynamicCmp type={type} />}
        </section>
    }
}



function DynamicCmp(props) {
    switch (props.type) {
        case 'note-txt':
            return <NoteAddTxt {...props} />
        // case 'note-img':
        //     return <NoteAddImg {...props} />
        // case 'note-todos':
        //     return <NoteAddTodos {...props} />
        // case 'note-video':
        //     return <NoteAddVideo {...props} />
    }
}