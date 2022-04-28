export class EmailCompose extends React.Component {


    state = {
        email: {
            subject,
            body,
            to,
            type,
            from
        }
    }

    // onHandleChange = ({ target }) => {

    // }


    render() {
        return <section className="email-compose">
            <h2>New Message</h2>
            <form id="msg-form">
                <input type="text" placeholder="To:" />
                <input type="text" placeholder="Subject:" />
                <textarea name="msg" id="msg" form="msg-form" placeholder="Your message.."></textarea>
            </form>
        </section>
    }
}