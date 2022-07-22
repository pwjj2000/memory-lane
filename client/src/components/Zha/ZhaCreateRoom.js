import {useState} from 'react'
import { useHistory } from 'react-router-dom'

function ZhaCreateRoom() {
    const [room, setRoom] = useState("")

    const history = useHistory()

    function createRoom() {
        history.push('/zha-game', {roomID: room, type: "create", game:"zha"})
    }

    return (
        <div className="Zha" title="ZhaCreateRoom">
            <h2>Zha</h2>
            <input placeholder='Room ID' onChange={(event) => setRoom(event.target.value)}/>
            <br />
            <button onClick={createRoom} className="hidden-button">
                <img src="./create.png" className="room-button" alt="Create"/>
            </button>
            <br/>
            <br/>
            <button onClick={() => history.push('/zha-new-game')} className="hidden-button">
            <img src="./back icon.png" className="backbutton" alt="Back"/>
            </button>
            <br/>
        </div>
    );
}

export default ZhaCreateRoom