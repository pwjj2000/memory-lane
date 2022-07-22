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
        <div className="Zha" title="ZhaJoinRoom">
            <h2>Zha</h2>
            <input placeholder='Room ID' onChange={(event) => setRoom(event.target.value)}/>
            <br />
            <button onClick={joinRoom} className="hidden-button">
                <img src="./join.png" className="room-button" alt="Join"/>
            </button>
            <br />
            <br />
            <br />
            <button onClick={joinRandom} className="hidden-button">
                <img src="./join random.png" className="room-button" alt="Join Random"/>
            </button>
            <br />
            <br />
            <button onClick={() => history.push('/zha-new-game')} className="hidden-button">
            <img src="./back icon.png" className="backbutton" alt="Back"/>
            </button>
            <br />
        </div>
    );
}

export default ZhaJoinRoom