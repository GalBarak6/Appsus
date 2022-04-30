import { emailService } from "../apps/mail/services/email-service.js"
import { EmailList } from "../apps/mail/cmps/email-list.jsx"
import { EmailSideBar } from "../apps/mail/cmps/email-side-bar.jsx"
import { EmailFilter } from "../apps/mail/cmps/email-filter.jsx"
import { EmailCompose } from "../apps/mail/cmps/email-compose.jsx"

// const { NavLink, Route, Switch } = ReactRouterDOM

export class Email extends React.Component {

    state = {
        emails: [],
        filterBy: null,
        mailStatus: 'inbox',
        unread: null,
        isOpenCompose: false
    }

    componentDidMount() {
        this.loadEmails()
    }

    loadEmails = () => {
        emailService.query(this.state.filterBy, this.state.mailStatus)
            .then(emails => this.setState({ emails }))
        emailService.unreadCount()
            .then(count => this.setState({ unread: count }))
    }

    onSetFilter = (filterBy, mailStatus) => {
        this.setState({ filterBy, mailStatus }, () => {
            this.loadEmails()
        })
    }

    onOpenCompose = () => {
        this.setState({ isOpenCompose: true })
    }

    onCloseCompose = () => {
        this.setState({ isOpenCompose: false })
    }

    render() {
        const { emails } = this.state
        return <section className="email">
            <EmailFilter onSetFilter={this.onSetFilter} />
            <div className="main-container">
                <EmailList emails={emails} loadEmails={this.loadEmails} />
                <EmailSideBar onSetFilter={this.onSetFilter} onOpenCompose={this.onOpenCompose} count={this.state.unread} />
            </div>
            {this.state.isOpenCompose && <EmailCompose onCloseCompose={this.onCloseCompose} loadEmails={this.loadEmails} />}
        </section>
    }
}

