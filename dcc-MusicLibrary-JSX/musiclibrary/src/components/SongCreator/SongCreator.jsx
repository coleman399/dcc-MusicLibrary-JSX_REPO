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
            <div>
                <form onSubmit={(event)=> this.handleSubmit(event)}>
                    Song Title:<input type="text" name="title"value={this.state.title}onChange={this.handleChange}/><br />
                    Artist:<input type="text" name="artist"value={this.state.artist}onChange={this.handleChange}/><br />
                    Album:<input type="text" name="album"value={this.state.album}onChange={this.handleChange}/><br />
                    Genre:<input type="text" name="genre"value ={this.state.genre}onChange={this.handleChange}/><br />
                    Release Date:<input type="date"name="release_date"value={this.state.release_date}onChange={this.handleChange}/>
                    <button type="submit" value="submit">Submit</button>
                </form>
            </div>
        )
    }
}

export default SongCreator;