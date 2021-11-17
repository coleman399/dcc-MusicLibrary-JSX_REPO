import React, {Component} from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      songs: []
    }
  }

  componentDidMount(){
    this.getSongs();
  }

  async getSongs() {
    let response = await axios.get('http://127.0.0.1:8000/music/')
    console.log(response.data);
    this.setState({
      songs: response.data
    });
  }

  render() {
    return (
      <div className="App">
        {this.state.songs.map(song => {
          return (
            <ul className="list-group">
              <li>title: {song.title}</li>
              <li>artist: {song.artist}</li>
              <li>album: {song.album}</li>
              <li>genre: {song.genre}</li>
              <li>-----------------------------------------------</li>
            </ul> 
          )
        })})
      </div>
    );
  }
}
export default App;
