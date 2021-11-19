import React, {Component} from 'react';
import './SearchBar.css'

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: ''
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.props.searchSong(this.state)
        this.setState({
            query: ''
        })
    }

    render() {
        return (
            <div className="input-group">
                <form className="form-control"onSubmit={(event) => this.handleSubmit(event)}>
                    <input className="form-control"type="text" name="query" value={this.state.query} onChange={this.handleChange}/>
                    <span className= "input-group-btn">
                        <button className = "btn btn-primary btn-sm"type="submit"value="submit">Search</button>
                    </span>
                </form>
            </div>
        )
    }
}

export default SearchBar;