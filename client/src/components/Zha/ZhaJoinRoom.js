import { useHistory } from 'react-router-dom'
import {useState} from 'react'

function ZhaJoinRoom() {
    const [room, setRoom] = useState("")

    const history = useHistory()
    
    function joinRoom() {
        history.push('/zha-game', {roomID: room, type: "join", game: "zha"})
    }

    function joinRandom() {
        history.push('/zha-game', {roomID: null, type: "random", game: "zha"})
    }

    return (
        <div className="Zha">
            <h2>Zha</h2>
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

export default ZhaJoinRoom