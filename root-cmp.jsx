import { Home } from './pages/app-home.jsx'
import { About } from './pages/app-about.jsx'
import { MainHeader } from './cmps/main-header.jsx'
import { Email } from './pages/email.jsx'
import { EmailDetails } from './apps/mail/pages/email-details.jsx'
import { Keep } from './pages/keep.jsx'
import { MainFooter } from './cmps/main-footer.jsx'
// import { EmailCompose } from './apps/mail/cmps/email-compose.jsx'
import { UserMsg } from './cmps/user-msg.jsx'

const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM

export function Main() {
    return <Router>
        <MainHeader />
        <section className="main">
            <Switch>
                <Route path="/email/:emailId" component={EmailDetails}></Route>
                <Route path="/email" component={Email}></Route>
                <Route path="/keep" component={Keep}></Route>
                <Route path="/about" component={About}></Route>
                <Route path="/" component={Home}></Route>
            </Switch>
        </section>
        <UserMsg />
        <MainFooter />
    </Router>
}

