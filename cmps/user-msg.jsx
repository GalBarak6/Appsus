import { eventBusService } from "../services/event-bus-service.js"

export class UserMsg extends React.Component {


    state = {
        msg: null
    }

    removeEvent
    timeoutId

    componentDidMount() {
        this.removeEvent = eventBusService.on('user-msg', (msg) => {
            this.setState({ msg })
            if (this.timeoutId) clearTimeout(this.timeoutId)
            this.timeoutId = setTimeout(this.onCloseMsg, 2000)
        })
    }

    componentWillUnmount() {
        this.removeEvent()
    }

    onCloseMsg = () => {
        this.setState({ msg: null })
        this.timeoutId = clearTimeout(this.timeoutId)
    }

    render() {
        const { msg } = this.state
        if (!msg) return <React.Fragment></React.Fragment>
        return <div className={`user-msg slide-left ${msg.type}`}>
            <button onClick={this.onCloseMsg}>X</button>
            {msg.title}
            <br />
            {msg.txt}
        </div>
    }
}