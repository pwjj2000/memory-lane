import { useHistory } from 'react-router-dom'

function ThumbsNewGame() {
    const history = useHistory()

    return (
        <div className="Thumbs" title='ThumbsNewGame'>
            <h2>Thumbs</h2>
            <img src="./thumbs logo.png" className='new-game-menu' alt="Thumbs Logo"/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <button onClick={() => history.push('/thumbs-create-room')} className="hidden-button">
            <img src='./create room transparent.png' className='create-room-button' alt="Create Room"/>
            </button>
            <button onClick={() => history.push('/thumbs-join-room')} className="hidden-button">
            <img src="./join room.png" className='join-room-button' alt="Join Room"/>
            </button>
            <br/>
            <br/>
            <br/>
            <button onClick={() => history.push('/thumbs')} className="hidden-button">
            <img src="./back icon.png" className="backbutton" alt="Back"/>
            </button>
            <br/>
            <br/>
        </div>
    );
}

export default ThumbsNewGame;