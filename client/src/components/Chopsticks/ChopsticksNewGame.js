import { useHistory } from 'react-router-dom'

function ChopsticksNewGame() {
    const history = useHistory()

    return (
        <div className="Chopsticks">
            <h2>Chopsticks</h2>
            <button onClick={() => history.push('/chopsticks-create-room')}>Create Room</button>
            <br />
            <br />
            <button onClick={() => history.push('/chopsticks-join-room')}>Join Room</button>
        </div>
    );
}

export default ChopsticksNewGame;