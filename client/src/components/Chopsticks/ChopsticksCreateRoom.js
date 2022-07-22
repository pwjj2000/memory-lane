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
            <button onClick={createRoom} className="hidden-button">
                <img src="./create.png" className="room-button" alt="Create"/>
            </button>
            <br/>
            <br/>
            <button onClick={() => history.push('/chopsticks-new-game')} className="hidden-button">
            <img src="./back icon.png" className="backbutton" alt="Back"/>
            </button>
            <br/>
        </div>
    );
}

export default ChopsticksCreateRoom