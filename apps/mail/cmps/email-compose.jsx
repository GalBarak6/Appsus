import { emailService } from "../services/email-service.js";
import { eventBusService } from "../../../services/event-bus-service.js"

export class EmailCompose extends React.Component {


    state = {
        email: {
            subject: '',
            body: '',
            to: ''
        }
    }

    onHandleChange = ({ target }) => {
        const value = target.value
        const field = target.name
        console.log(value);
        console.log(field);
        this.setState((prevState) => ({ email: { ...prevState.email, [field]: value } }))
    }

    onSendMail = (ev) => {
        ev.preventDefault()
        console.log('sent!');
        emailService.sendEmail(this.state.email)
            .then(() => {
                this.props.onCloseCompose()
                this.props.loadEmails()
                eventBusService.emit('user-msg', { type: 'success', title: 'Success!', txt: 'This mail has been sent' })
            })
            .catch(() => {
                eventBusService.emit('user-msg', {
                    type: 'danger', title: 'Something is wrong', txt: 'Could not send email'
                })
            })
    }

    render() {
        return <section className="email-compose open slide-top">
            <h2>New Message</h2>
            <form id="msg-form" onSubmit={this.onSendMail}>
                <input type="text" placeholder="To:" name="to" onChange={this.onHandleChange} />
                <input type="text" placeholder="Subject:" name="subject" onChange={this.onHandleChange} />
                <textarea name="body" id="msg" form="msg-form" placeholder="Type here.."
                    onChange={this.onHandleChange}></textarea>
                <button type="submit">Send</button>
                <button onClick={this.props.onCloseCompose} className="close-compose">X</button>
            </form>
        </section>
    }
}