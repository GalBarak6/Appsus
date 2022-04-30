import { eventBusService } from "../../../services/event-bus-service.js"
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

    onDeleteEmail = () => {
        emailService.moveMailToTrash(this.state.email.id)
            .then(() => {
                this.onGoBack()
                eventBusService.emit('user-msg', { type: 'success', title: 'Success!', txt: 'This mail has been moved to trash' })
            })
            .catch(() => {
                eventBusService.emit('user-msg', {
                    type: 'danger', title: 'Something is wrong', txt: 'Could not delete email :('
                })
            })
    }

    onGoBack = () => {
        this.props.history.push('/email')
    }

    onReadMail = (emailId) => {
        emailService.readMail(emailId)
    }

    render() {
        const { email } = this.state
        if (!email) return <React.Fragment></React.Fragment>
        this.onReadMail(email.id)
        return <section className="email-details">
            <div>
                <h4>From: {email.from}</h4>
            </div>
            <div>
                <h2>Subject: {email.subject}</h2>
            </div>
            <div>
                <p>{email.body}</p>
            </div>
            <div className="icons">
                <img src="./assets/icons/back.png" alt="" onClick={this.onGoBack} />
                <button onClick={this.onDeleteEmail}><img src="./assets/icons/delete.png" alt="" /></button>
            </div>
        </section>
    }
}