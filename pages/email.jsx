import { emailService } from "../apps/mail/services/email-service.js"


export class Email extends React.Component {


    componentDidMount() {
        this.loadEmails()
    }

    loadEmails = () => {
        emailService.query()
    }


    render() {
        return <section className="email">
            hello from email
        </section>
    }
}