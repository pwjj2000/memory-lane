import { useHistory } from 'react-router-dom'

function ThumbsNewGame() {
    const history = useHistory()

    return (
        <div className="Thumbs">
            <h2>Thumbs</h2>
            <button onClick={() => history.push('/thumbs-create-room')}>Create Room</button>
            <br />
            <br />
            <button onClick={() => history.push('/thumbs-join-room')}>Join Room</button>
        </div>
    );
}

export default ThumbsNewGame;