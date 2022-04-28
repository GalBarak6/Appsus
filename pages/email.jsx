import { emailService } from "../apps/mail/services/email-service.js"
import { EmailList } from "../apps/mail/cmps/email-list.jsx"
import { EmailSideBar } from "../apps/mail/cmps/email-side-bar.jsx"
import { EmailFilter } from "../apps/mail/cmps/email-filter.jsx"

// const { NavLink, Route, Switch } = ReactRouterDOM

export class Email extends React.Component {

    state = {
        emails: [],
        filterBy: null,
        mailStatus: 'inbox',
        unread: ''
    }

    componentDidMount() {
        this.loadEmails()
    }

    loadEmails = () => {
        emailService.query(this.state.filterBy, this.state.mailStatus)
            .then(emails => this.setState({ emails }))
        emailService.countUnread()
            .then(count => this.setState({ unread: count }))
    }

    onSetFilter = (filterBy, mailStatus) => {
        console.log(filterBy);
        console.log(mailStatus);
        this.setState({ filterBy , mailStatus}, () => {
            console.log(this.state.filterBy,this.state.mailStatus);
            this.loadEmails()
        })
    }

    render() {
        const { emails } = this.state
        return <section className="email">
            <EmailFilter onSetFilter={this.onSetFilter} />
            <EmailList emails={emails} loadEmails={this.loadEmails} />
            <EmailSideBar onSetFilter={this.onSetFilter}/>
        </section>
    }
}

