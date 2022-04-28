export class EmailFilter extends React.Component {

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
        console.log(this.state.filterBy);
        return <section className="email-filter">
            <input type="text" name="search" placeholder="Search mail" className="icon" onChange={this.onHandleChange} />
            <select name="filter" id="filter" onChange={this.onHandleChange}>
                <option value="all" name="all">All</option>
                <option value="read" name="read">Read</option>
                <option value="unread" name="unread">Unread</option>
                <option value="starred" name="starred">Starred</option>
            </select>
        </section>
    }
}