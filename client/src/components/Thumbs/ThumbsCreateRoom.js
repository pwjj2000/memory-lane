import {useState} from 'react'
import { useHistory } from 'react-router-dom'

function ThumbsCreateRoom() {
    const [room, setRoom] = useState("")

    const history = useHistory()

    function createRoom() {
        history.push('/thumbs-game', {roomID: room, type: "create", game:"thumbs"})
    }

    return (
        <div className="Thumbs" title='ThumbsCreateRoom'>
            <h2>Thumbs</h2>
            <input placeholder='Room ID' onChange={(event) => setRoom(event.target.value)}/>
            <br />
            <button onClick={createRoom} className="hidden-button">
            <img src='./create.png' className="room-button" alt="Create"/>
            </button>
            <br/>
            <br/>
            <button onClick={() => history.push('/thumbs-new-game')} className="hidden-button">
            <img src="./back icon.png" className="backbutton" alt="Back"/>
            </button>
            <br/>
        </div>
    );
}

export default ThumbsCreateRoom