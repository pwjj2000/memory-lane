import { useHistory } from 'react-router-dom'

function ZhaNewGame() {
    const history = useHistory()

    return (
        <div className="Zha">
            <h2>Zha</h2>
            <button onClick={() => history.push('/zha-create-room')}>Create Room</button>
            <br />
            <br />
            <button onClick={() => history.push('/zha-join-room')}>Join Room</button>
        </div>
    );
}

export default ZhaNewGame;