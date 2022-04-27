import { emailService } from "../services/email-service"

const { Link } = ReactRouterDOM


export class EmailPreview extends React.Component {

    state = {
        email: null
    }

    onDeleteEmail = (id) => {
        console.log(id);
    }

    render() {
        const { email } = this.props
        const subjClass = (email.isRead) ? '' : 'unread'
        return <section>
            <Link to={`/email/${email.id}`}>
                <article className="email-preview">
                    <h3 className={subjClass}>{email.from}</h3>
                    <h3 className={subjClass}>{email.subject}</h3>
                    <p className={subjClass}>{email.body.substring(0, 100)}</p>
                </article>
            </Link>
            <button onClick={() => this.onDeleteEmail(email.id)}>delete</button>
        </section>
    }
}

