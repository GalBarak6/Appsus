import { emailService } from "../services/email-service"
import { eventBusService } from "../../../services/event-bus-service.js"

const { Link } = ReactRouterDOM


export class EmailPreview extends React.Component {


    onDeleteEmail = () => {
        emailService.moveMailToTrash(this.props.email.id)
            .then(() => {
                this.props.loadEmails()
                eventBusService.emit('user-msg', { type: 'success', title: 'Success!', txt: 'This mail has been moved to trash' })
            })
            .catch(() => {
                eventBusService.emit('user-msg', {
                    type: 'danger', title: 'Something is wrong', txt: 'Could not delete email'
                })
            })
    }

    onToggleStatus = (isRead) => {
        const status = (isRead) ? 'read' : 'unread'
        emailService.toggleStatus(this.props.email.id)
            .then(() => {
                this.props.loadEmails()
                eventBusService.emit('user-msg', { type: 'success', title: 'Success!', txt: `Marked as ${status}` })
            })
            .catch(() => {
                eventBusService.emit('user-msg', {
                    type: 'danger', title: 'Something is wrong', txt: 'Could not mark email'
                })
            })
    }

    onBackToInbox = (emailId) => {
        emailService.backToInbox(emailId)
            .then(() => {
                this.props.loadEmails()
                eventBusService.emit('user-msg', { type: 'success', title: 'Success!', txt: 'Moved to inbox' })
            })
            .catch(() => {
                eventBusService.emit('user-msg', {
                    type: 'danger', title: 'Something is wrong', txt: 'Could not move email'
                })
            })
    }

    render() {
        const { email } = this.props
        const subjClass = (email.isRead) ? '' : 'unread'
        return <section className="email-preview">
            <Link to={`/email/${email.id}`}>
                <article className="email-container">
                    <div>
                        <h3 className={subjClass}>{email.from}</h3>
                    </div>
                    <div>
                        <h3 className={subjClass}>{email.subject.substring(0, 50)}</h3>
                        <p className={subjClass}>{`${email.body.substring(0, 35)}...`}</p>
                    </div>
                    <div className="date">
                        <h3 className={subjClass}>{email.sentAt}</h3>
                    </div>
                </article>
            </Link>
            <div>
                {(email.isRead) ? <button title="Mark as unread" onClick={() => this.onToggleStatus(email.isRead)}><img src="./assets/icons/read.png" alt="" /></button>
                    : <button title="Mark as read" onClick={() => this.onToggleStatus(email.isRead)}><img src="./assets/icons/unread.png" alt="" /></button>}
                {(email.mailStatus !== 'trash') ? <button title="Move to trash" onClick={() => this.onDeleteEmail(email.id)}><img src="./assets/icons/delete.png" alt="" /></button>
                    : <button title="Move back to inbox" onClick={() => this.onBackToInbox(email.id)}><img src="./assets/icons/backToInbox.png" alt="" /></button>}
            </div>
        </section>
    }
}

