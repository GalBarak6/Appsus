import { EmailPreview } from "./email-preview.jsx"

export function EmailList({ emails , loadEmails}) {
    return <section className="email-list">
        {emails.map(email => <EmailPreview email={email} key={email.id} loadEmails={loadEmails}/>)}
    </section>
}