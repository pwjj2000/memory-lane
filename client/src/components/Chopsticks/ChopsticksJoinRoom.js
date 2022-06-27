import { useHistory } from 'react-router-dom'
import { useState } from 'react'

function ChopsticksJoinRoom() {
    const [room, setRoom] = useState("")

    const history = useHistory()
    
    function joinRoom() {
        history.push('/chopsticks-game', {roomID: room, type: "join", game: "chopsticks"})
    }

    function joinRandom() {
        history.push('/chopsticks-game', {roomID: null, type: "random", game: "chopsticks"})
    }

    return (
        <div className="Chopsticks">
            <h2>Chopsticks</h2>
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

export default ChopsticksJoinRoom