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
    try {
      let response = await axios.get('http://127.0.0.1:8000/music/');   
      console.log(response.data);
      this.setState({
        songs: response.data
      });
    } catch (err) {
      console.log(err);
    }
  }

   deleteSong = async (id) => {
    try {
      await axios.delete('http://127.0.0.1:8000/music/' + id + '/');   
      this.getSongs();
    } catch (err) {
      console.log(err);
    }
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
    let songs = this.state.songs;
    let foundSongs = this.searchedSong(songs, search.query);
    if (foundSongs === undefined){
      this.getSongs();
    } else {
      Promise.all(foundSongs.map(async (song, i) => {
        let response;
        try {
          response = await axios.get('http://127.0.0.1:8000/music/' + song[i].id + '/');
          return response.data
        } catch (err) {
          console.log(err);
        }
      })).then(response => {
        this.setState({
          songs: response
        })
        console.log(response);
      })
    }
  }
  
  searchedSong = (songs, query) => {
    let title = songs.filter(song => song.title == query).map(({
        id,
        title,
        album,
        genre,
        release_date
      }) => ({
        id,
        title,
        album,
        genre,
        release_date
      }));
    let artist = songs.filter(song => song.artist == query).map(({
        id,
        title,
        album,
        genre,
        release_date
      }) => ({
        id,
        title,
        album,
        genre,
        release_date
      }));
    let album = songs.filter(song => song.album == query).map(({
        id,
        title,
        album,
        genre,
        release_date
      }) => ({
        id,
        title,
        album,
        genre,
        release_date
      }));
    let genre = songs.filter(song => song.genre == query).map(({
        id,
        title,
        album,
        genre,
        release_date
      }) => ({
        id,
        title,
        album,
        genre,
        release_date
      }));
    let foundSongs = [title, artist, album, genre]
    let i = 0;
    let sortedSongs; 
    while (i < foundSongs.length-1) {
      sortedSongs = foundSongs.filter(song => song == foundSongs[i])
      i += 1;   
    }
    if (sortedSongs[0].length !== 0){
      return sortedSongs;
    } else {
      this.getSongs();
    }
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
