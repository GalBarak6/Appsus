import { emailService } from "../services/email-service.js"


export class EmailDetails extends React.Component {

    state = {
        email: null
    }

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

    render() {
        const { email } = this.state
        if (!email) return <React.Fragment></React.Fragment>
        return <section className="email-details">
            {email.subject}
            {email.sentAt}
            {email.body}
        </section>
    }
}