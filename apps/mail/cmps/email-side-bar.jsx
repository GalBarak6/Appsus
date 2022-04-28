const { Link, Route, Switch } = ReactRouterDOM
// import { EmailCompose } from "./email-compose"

export class EmailSideBar extends React.Component {


    state = {
        mailStatus: ''
    }

    onHandleChange = ({ target }) => {
        const value = target.name
        this.setState({ mailStatus: value })
    }

    render() {
        return <section className="email-side-bar">
            <img src="/assets/icons/plus.png" alt="" />
            <img src="/assets/icons/inbox.png" alt="" name="inbox" onClick={this.onHandleChange} />
            <img src="/assets/icons/star.png" alt="" name="star" onClick={this.onHandleChange} />
            <img src="/assets/icons/sent.png" alt="" name="sent" onClick={this.onHandleChange} />
            <img src="/assets/icons/delete.png" alt="" name="delete" onClick={this.onHandleChange} />
        </section>
    }
}
