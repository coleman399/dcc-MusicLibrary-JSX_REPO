import React from 'react';
import './SongTable.css'

const SongTable = (props) => {
    return (
        <div>
            <h1 className="text-center">Song Table</h1>
            <table className="table table-bordered">
                <thead>
                    <th scope="col">Title</th>
                    <th scope="col">Artist</th>
                    <th scope="col">Album</th>
                    <th scope="col">Genre</th>
                    <th scope="col">Release Date</th>
                    <th className="text-center"scope="col">Delete</th>
                </thead>
                <tbody>
                    {props.songs.map(song => {
                        return (
                            <tr>
                                <td>{song.title}</td>
                                <td>{song.artist}</td>
                                <td>{song.album}</td>
                                <td>{song.genre}</td>
                                <td>{song.release_date}</td>
                                <td className="text-center"><button type="button" className="btn btn-primary" onClick={()=> props.deleteSong(song.id)}>Delete</button></td>
                            </tr>                          
                        )
                    })}
                </tbody>    
            </table>
        </div>
    )
}

export default SongTable;