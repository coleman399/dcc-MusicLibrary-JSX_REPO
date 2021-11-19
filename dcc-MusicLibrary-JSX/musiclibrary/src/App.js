import React, {Component} from 'react';
import axios from 'axios';
import './App.css';
import SongTable from './components/SongTable/SongTable.jsx';
import SongCreator from './components/SongCreator/SongCreator.jsx';
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

   deleteSong = async (id) => {
    await axios.delete('http://127.0.0.1:8000/music/' + id + '/')   
    this.getSongs()
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

  addSong = async (newSong) => {
    let id = this.state.songs.length ? this.state.songs[this.state.songs.length -1].id + 1 : 1;
    let song = {
      id: id,
      title: newSong.title,
      artist: newSong.artist,
      album: newSong.album,
      genre: newSong.genre,
      release_date: newSong.release_date
    }
    try {
      let response = await axios.post('http://127.0.0.1:8000/music/', newSong);
      console.log(response.data)
      this.setState({
        songs: [...this.state.songs, song],
      }, () => console.log(this.state.songs));
    } catch (err) {
      console.log(err);
    }
  }

  addedSong(songs, id) {
    let newSongs = [];
    songs.map((song => {
      if (song.id !== id){
        newSongs.push(songs)
      }
    }))
    return newSongs;
  }

  render() {
    return (
      <div className="container-fluid">
        <SongTable {...this.state} deleteSong = {this.deleteSong}/>
        <SongCreator {...this.state} addSong = {this.addSong} />
      </div>
    );
  }
}
export default App;
