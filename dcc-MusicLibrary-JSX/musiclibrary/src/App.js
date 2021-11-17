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

  render() {
    return (
      <div className="container-fluid">
        <SongTable {...this.state}/>
      </div>
    );
  }
}
export default App;
