import {useState} from 'react'
import { useHistory } from 'react-router-dom'

function ThumbsCreateRoom() {
    const [room, setRoom] = useState("")

    const history = useHistory()

    function createRoom() {
        history.push('/thumbs-game', {roomID: room, type: "create", game:"thumbs"})
    }

    return (
        <div className="Thumbs">
            <h2>Thumbs</h2>
            <input placeholder='Room ID' onChange={(event) => setRoom(event.target.value)}/>
            <br />
            <button onClick={createRoom} class="hidden-button">
            <img src='./create.png' class="room-button"/>
            </button>
            <br/>
            <br/>
            <button onClick={() => history.push('/thumbs-new-game')} class="hidden-button">
            <img src="./back icon.png" class="backbutton"/>
            </button>
            <br/>
        </div>
    );
}

export default ThumbsCreateRoom