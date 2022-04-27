import { emailService } from "../services/email-service.js"


export class EmailDetails extends React.Component {

    state = {
        email: null
    }

    removeEvent

    componentDidMount() {
        this.loadEmail()
    }

    loadEmail = () => {
        const { emailId } = this.props.match.params
        emailService.getById(emailId)
            .then(email => {
                if (!email) return this.props.history.push('/')
                this.setState({ email })
            })
    }

    onDeleteEmail = () => {
        emailService.deleteEmail(this.state.email.id)
            .then(this.onGoBack())
    }

    onGoBack = () => {
        this.props.history.push('/email')
    }

    render() {
        const { email } = this.state
        if (!email) return <React.Fragment></React.Fragment>
        return <section className="email-details">
            {email.subject}
            {email.sentAt}
            {email.body}
            <button onClick={this.onDeleteEmail}>DELETE</button>
            <img src="/assets/icons/back.png" alt="" onClick={this.onGoBack} />
        </section>
    }
}