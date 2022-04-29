
export class EmailSideBar extends React.Component {


    state = {
        mailStatus: 'inbox',
        isOpenCompose: false
    }

    onHandleChange = ({ target }) => {
        const value = target.name
        this.setState({ mailStatus: value }, () => {
            this.props.onSetFilter(null, this.state.mailStatus)
        })
    }

    render() {
        return <section className="email-side-bar">
            <div title="Send a new mail" className="add" onClick={this.props.onOpenCompose}>
                <img src="./assets/icons/plus.png" alt="" />
                <h2>Compose</h2>
            </div>
            <div>
                <img src="./assets/icons/inbox.png" alt="" name="inbox" onClick={this.onHandleChange} />
                <h2>Inbox</h2>
            </div>
            <div>
                <img src="./assets/icons/star.png" alt="" name="star" onClick={this.onHandleChange} />
                <h2>Starred</h2>
            </div>
            <div>
                <img src="./assets/icons/sent.png" alt="" name="sent" onClick={this.onHandleChange} />
                <h2>Sent</h2>
            </div>
            <div>
                <img src="./assets/icons/delete.png" alt="" name="trash" onClick={this.onHandleChange} />
                <h2>Trash</h2>
            </div>
        </section>
    }
}
