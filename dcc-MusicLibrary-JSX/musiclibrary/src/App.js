import React, {Component} from 'react';
import axios from 'axios';
import './App.css';
import SongTable from './components/SongTable/SongTable.jsx';
import SongCreator from './components/SongCreator/SongCreator.jsx';
import SearchBar from './components/SearchBar/SearchBar.jsx';
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
    let response = await axios.get('http://127.0.0.1:8000/music/');   
    console.log(response.data);
    this.setState({
      songs: response.data
    });
  }

   deleteSong = async (id) => {
    await axios.delete('http://127.0.0.1:8000/music/' + id + '/');   
    this.getSongs();
  }

  addSong = async (newSong) => {
    let id = this.state.songs.length
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

  searchSong = async (search) => {
    this.getSongs();
    let songs = this.state.songs;
    let foundSong = songs.find(song => song.title === search.query);
    console.log(foundSong);
    alert(`Song Found!\nTitle: ${foundSong.title}\nArtist: ${foundSong.artist}\nAlbum: ${foundSong.album}\nGenre: ${foundSong.genre}\nRelease Date: ${foundSong.release_date}`)
  } 

  render() {
    return (
      <div className="container-fluid">
        <br/>
        <div className="row">
          <div className="col-8"/>
          <div className="col-4">
            <SearchBar searchSong = {this.searchSong} />
            <br/>
          </div>
        </div>
        <div className="row">
          <div className="col-2"/>
          <div className="col-8">
            <SongTable {...this.state} deleteSong = {this.deleteSong}/>
            <br/>
          </div>
          <div className="col-2"/>
        </div>
        <div className="row">
          <div className="col-4"/>
          <div className="col-4">
            <SongCreator addSong = {this.addSong} />
            <br/>
          </div>
          <div className="col-4"/>
        </div>
      </div>
    );
  }
}
export default App;
