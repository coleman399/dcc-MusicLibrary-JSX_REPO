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

  getSongs = async () => {
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

  addSong = async (newSong) => {
    let id = this.state.songs.length + 1
    let song = {
      id: id,
      title: newSong.title,
      artist: newSong.artist,
      album: newSong.album,
      genre: newSong.genre,
      release_date: newSong.release_date
    }
    try {
      await axios.post('http://127.0.0.1:8000/music/', song);
      this.setState({
        songs: [...this.state.songs, song],
      }, () => console.log(this.state.songs));
    } catch (err) {
      console.log(err);
    }
  }

  searchSong = async (id) => {
    
  }

  render() {
    return (
      <div className="container-fluid">
        <SongTable {...this.state} deleteSong = {this.deleteSong}/>
        <SongCreator addSong = {this.addSong} />
      </div>
    );
  }
}
export default App;
