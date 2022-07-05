import { useHistory } from 'react-router-dom'
import {useState} from 'react'

function ThumbsJoinRoom() {
    const [room, setRoom] = useState("")

    const history = useHistory()
    
    function joinRoom() {
        history.push('/thumbs-game', {roomID: room, type: "join", game: "thumbs"})
    }

    function joinRandom() {
        history.push('/thumbs-game', {roomID: null, type: "random", game: "thumbs"})
    }

    return (
        <div className="Thumbs">
            <h2>Thumbs</h2>
            <input placeholder='Room ID' onChange={(event) => setRoom(event.target.value)}/>
            <br />
            <button onClick={joinRoom}>Join</button>
            <br />
            <br />
            <br />
            <button onClick={joinRandom}>Join Random</button>
        </div>
    );
}

export default ThumbsJoinRoom