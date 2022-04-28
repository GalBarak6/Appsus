import { eventBusService } from "../../../services/event-bus-service.js"
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
            .then(() => {
                this.onGoBack()
                eventBusService.emit('user-msg', { type: 'success', txt: 'Deleted email successfully' })
            })
            .catch(() => {
                eventBusService.emit('user-msg', {
                    type: 'danger', txt: 'Could not delete car :('
                })
            })
    }

    onGoBack = () => {
        this.props.history.push('/email')
    }

    render() {
        const { email } = this.state
        if (!email) return <React.Fragment></React.Fragment>
        return <section className="email-details">
            <h4>{email.from}</h4>
            <h2>{email.subject}</h2>
            <h3>{email.body}</h3>
            <button onClick={this.onDeleteEmail}>DELETE</button>
            <img src="/assets/icons/back.png" alt="" onClick={this.onGoBack} />
        </section>
    }
}