import React from 'react';

const SongTable = (props) => {
    return (
        <div>
            <table className="table">
                    <th scope="col">title</th>
                    <th scope="col">artist</th>
                    <th scope="col">album</th>
                    <th scope="col">genre</th>
                    <th scope="col">release date</th>
                <tbody>
                    {props.songs.map(song => {
                        return (
                            <tr>
                                <td>{song.title}</td>
                                <td>{song.artist}</td>
                                <td>{song.album}</td>
                                <td>{song.genre}</td>
                                <td>{song.release_date}</td>
                                <td><button onClick={props.deleteSong.bind(this, song.id)}>Delete</button></td>
                            </tr>
                        )
                    })}
                </tbody>    
            </table> 
        </div>
    )
}

export default SongTable;