const {Link} = ReactRouterDOM


export function EmailPreview({ email }) {
    return <Link to={`/email/${email.id}`}>
    <article className="email-preview">
        <h4>{email.subject}</h4>
        <p>{email.body.substring(0,100)}</p>
    </article>
    </Link>
}