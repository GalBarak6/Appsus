export class NoteFilter extends React.Component {

    state = {
        filterBy: {
            search: '',
            type: 'all'
        }
    }

    
    onHandleChange = ({ target }) => {
        const value = target.value
        const field = (target.type === 'text') ? target.name : 'type'
        this.setState((prevState) => ({ filterBy: { ...prevState.filterBy, [field]: value } }), () => {
            this.props.onSetFilter(this.state.filterBy)
        })
    }

    render() {
        const { txt, type } = this.state.filterBy

        console.log(this.state.filterBy);
        return <section className="email-filter">
            <input type="text" name="search" placeholder="Search note" className="icon" onChange={this.onHandleChange} />
            <select name="type" id="type" onChange={this.onHandleChange}>
                <option value="all" name="all">All</option>
                <option value="note-txt" name="read">Text</option>
                <option value="note-img" name="unread">Image</option>
                <option value="note-todos" name="starred">Todos</option>
                <option value="note-video" name="starred">Video</option>
            </select>
        </section>

    }

}
