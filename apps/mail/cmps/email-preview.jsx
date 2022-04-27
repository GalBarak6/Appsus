import { emailService } from "../services/email-service"

const { Link } = ReactRouterDOM


export class EmailPreview extends React.Component {

    state = {
        email: null
    }

    render() {
        const { email } = this.props
        const subjClass = (email.isRead) ? 'read' : ''
        return <Link to={`/email/${email.id}`}>
            <article className="email-preview">
                <h3 className={subjClass}>{email.subject}</h3>
                <p>{email.body.substring(0, 100)}</p>
            </article>
        </Link>
    }
}

