import { emailService } from "../services/email-service"

const { Link } = ReactRouterDOM


export class EmailPreview extends React.Component {

    state = {
        unreadCount: ''
    }

    onDeleteEmail = () => {
        console.log(this.props.email.id);
        emailService.deleteEmail(this.props.email.id)
            .then(this.props.loadEmails())
    }

    render() {
        const { email } = this.props
        const subjClass = (email.isRead) ? '' : 'unread'
        return <section>
            <Link to={`/email/${email.id}`}>
                <article className="email-preview">
                    <h3 className={subjClass}>{email.from}</h3>
                    <h3 className={subjClass}>{email.subject.substring(0, 50)}</h3>
                    <p className={subjClass}>{`${email.body.substring(0, 35)}...`}</p>
                    <h3 className={subjClass}>{email.sentAt}</h3>
                </article>
            </Link>
            <button onClick={() => this.onDeleteEmail(email.id)}>delete</button>
        </section>
    }
}

