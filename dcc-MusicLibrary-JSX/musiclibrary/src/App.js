import React, {Component} from 'react';
import axios from 'axios';
import './App.css';
import SongTable from './components/SongTable/SongTable.jsx';

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

  async deleteSong(id) {
    let response = await axios.delete('http://127.0.0.1:8000/music/' + id + '/')   
    console.log(response.data);
    this.state.songs = this.deletedSong(this.state.songs, id)
    this.setState({
      songs: response.data
    });
  }

  deletedSong(songs, id) {
    let newSongs = [];
    songs.map((song) => {
      if (song.id !== id){
        newSongs.push(songs)
      }
    })
    return newSongs;
  }

  render() {
    return (
      <div className="container-fluid">
        <SongTable {...this.state} deleteSong = {this.deleteSong}/>
      </div>
    );
  }
}
export default App;
