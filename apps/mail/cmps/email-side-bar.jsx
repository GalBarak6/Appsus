
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
            <div className="add" onClick={this.props.onOpenCompose}>
                <img src="/assets/icons/plus.png" alt="" />
                <h2>Compose</h2>
            </div>
            <img src="./assets/icons/inbox.png" alt="" name="inbox" onClick={this.onHandleChange} />
            <img src="./assets/icons/star.png" alt="" name="star" onClick={this.onHandleChange} />
            <img src="./assets/icons/sent.png" alt="" name="sent" onClick={this.onHandleChange} />
            <img src="./assets/icons/delete.png" alt="" name="delete" onClick={this.onHandleChange} />
        </section>
    }
}
