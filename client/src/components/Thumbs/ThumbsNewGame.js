import { useHistory } from 'react-router-dom'

function ThumbsNewGame() {
    const history = useHistory()

    return (
        <div className="Thumbs">
            <h2>Thumbs</h2>
            <img src="./thumbs logo.png" class ='new-game-menu' />
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <button onClick={() => history.push('/thumbs-create-room')} class="hidden-button">
            <img src='./create room transparent.png' class='create-room-button'/>
            </button>
            <button onClick={() => history.push('/thumbs-join-room')} class="hidden-button">
            <img src="./join room.png" class='join-room-button' />
            </button>
            <br/>
            <br/>
            <br/>
            <button onClick={() => history.push('/thumbs')} class="hidden-button">
            <img src="./back icon.png" class="backbutton"/>
            </button>
            <br/>
            <br/>
        </div>
    );
}

export default ThumbsNewGame;