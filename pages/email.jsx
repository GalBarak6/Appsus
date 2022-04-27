import { emailService } from "../apps/mail/services/email-service.js"
import { EmailList } from "../apps/mail/cmps/email-list.jsx"
import { EmailSideBar } from "../apps/mail/cmps/email-side-bar.jsx"

export class Email extends React.Component {

    state = {
        emails: []
    }

    componentDidMount() {
        this.loadEmails()
    }

    loadEmails = () => {
        emailService.query()
            .then(emails => this.setState({ emails }))
    }

    render() {
        const { emails } = this.state
        return <section className="email">
            <EmailList emails={emails}/>
            <EmailSideBar />
        </section>
    }
}