import {useState} from 'react'
import { useHistory } from 'react-router-dom'

function ChopsticksCreateRoom() {
    const [room, setRoom] = useState("")

    const history = useHistory()

    function createRoom() {
        history.push('/chopsticks-game', {roomID: room, type: "create", game:"chopsticks"})
    }

    return (
        <div className="Chopsticks">
            <h2>Chopsticks</h2>
            <input placeholder='Room ID' onChange={(event) => setRoom(event.target.value)}/>
            <br />
            <button onClick={createRoom}>Create</button>
        </div>
    );
}

export default ChopsticksCreateRoom