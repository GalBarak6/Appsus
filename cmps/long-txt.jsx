export class LongTxt extends React.Component {

    state = {
      isLongTxtShown: false
    }
  
    onToggleShownTxt = () => {
      this.setState({ isLongTxtShown: !this.state.isLongTxtShown })
    }
  
    render() {
      const { isLongTxtShown } = this.state
      const { txt } = this.props
      return <div className="long-txt">
        {!isLongTxtShown && <React.Fragment>
          <p>Description : {(txt.length > 100) ? txt.substring(0, 100) : txt}</p>
          {(txt.length > 100) && <button onClick={this.onToggleShownTxt}>Read more...</button>}
        </React.Fragment>}
  
        {(isLongTxtShown) && <React.Fragment>
          <p>Description : {txt}</p>
          <button onClick={this.onToggleShownTxt}>Read less...</button>
        </React.Fragment>}
      </div>
    }
  }