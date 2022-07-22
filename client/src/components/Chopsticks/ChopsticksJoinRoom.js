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
        <div className="Chopsticks" title='ChopsticksJoinRoom'>
            <h2>Chopsticks</h2>
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
            <br/>
            <br />
            <button onClick={() => history.push('/chopsticks-new-game')} className="hidden-button">
            <img src="./back icon.png" className="backbutton" alt="Back"/>
            </button>
            <br />
        </div>
    );
}

export default ChopsticksJoinRoom