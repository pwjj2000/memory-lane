import {useState} from 'react'
import { useHistory } from 'react-router-dom'

function ZhaCreateRoom() {
    const [room, setRoom] = useState("")

    const history = useHistory()

    function createRoom() {
        history.push('/zha-game', {roomID: room, type: "create", game:"zha"})
    }

    return (
        <div className="Zha">
            <h2>Zha</h2>
            <input placeholder='Room ID' onChange={(event) => setRoom(event.target.value)}/>
            <br />
            <button onClick={createRoom}>Create</button>
        </div>
    );
}

export default ZhaCreateRoom