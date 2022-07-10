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
            <button onClick={joinRoom} class="hidden-button">
                <img src="./join.png" class="room-button"/>
            </button>
            <br />
            <br />
            <br />
            <button onClick={joinRandom} class="hidden-button">
                <img src="./join random.png" class="room-button"/>
            </button>
            <br />
            <br />
            <button onClick={() => history.push('/zha-new-game')} class="hidden-button">
            <img src="./back icon.png" class="backbutton"/>
            </button>
            <br />
        </div>
    );
}

export default ZhaJoinRoom