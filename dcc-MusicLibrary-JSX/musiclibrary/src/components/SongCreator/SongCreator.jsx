import React, {Component} from 'react';
import './SongCreator.css'

class SongCreator extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            title : '',
            artist : '',
            album : '',
            genre : '',
            release_date : '',
        }
    }


    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.props.addSong(this.state)
        this.setState({
            title : '',
            artist : '',
            album : '',
            genre : '',
            release_date : '',
        })
        
    }
    
    render() {
        return (
            <div className="form-group">
                <h1 className="text-center">Song Creator</h1>
                <form className="form-control"onSubmit={(event)=> this.handleSubmit(event)}>
                    Title: <input className="form-control" type="text" name="title"value={this.state.title}onChange={this.handleChange}/><br />
                    Artist: <input className="form-control"type="text" name="artist"value={this.state.artist}onChange={this.handleChange}/><br />
                    Album: <input className="form-control"type="text" name="album"value={this.state.album}onChange={this.handleChange}/><br />
                    Genre: <input className="form-control"type="text" name="genre"value ={this.state.genre}onChange={this.handleChange}/><br />
                    Release Date: <input className="form-control"type="date"name="release_date"value={this.state.release_date}onChange={this.handleChange}/>
                    <br/>
                    <button className="btn btn-primary"type="submit" value="submit">Submit</button>
                </form>
            </div>
        )
    }
}

export default SongCreator;