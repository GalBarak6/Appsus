import { emailService } from "../apps/mail/services/email-service.js"
import { EmailList } from "../apps/mail/cmps/email-list.jsx"
import { EmailSideBar } from "../apps/mail/cmps/email-side-bar.jsx"
import { EmailFilter } from "../apps/mail/cmps/email-filter.jsx"

export class Email extends React.Component {

    state = {
        emails: [],
        filterBy: null
    }

    componentDidMount() {
        this.loadEmails()
    }

    loadEmails = () => {
        emailService.query(this.state.filterBy)
            .then(emails => this.setState({ emails }))
    }

    onSetFilter = (filterBy) => {
        console.log(filterBy);
        this.setState({filterBy}, () => {
            console.log(this.state.filterBy);
            this.loadEmails()
        })
    }

    render() {
        const { emails } = this.state
        return <section className="email">
            <EmailFilter onSetFilter={this.onSetFilter}/>
            <EmailList emails={emails}/>
            <EmailSideBar />
        </section>
    }
}