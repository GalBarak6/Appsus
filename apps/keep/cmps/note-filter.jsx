export class NoteFilter extends React.Component {

    state = {
        filterBy: {
            txt: '',
            type: ''
        }
    }

    render(){
        const { txt, type } = this.state.filterBy

        return <section className="note-filter">
            <form>
            <label htmlFor="search">search</label>
                <input type="text" id="search" name="search"/>
            </form>

        </section>

    }

}
