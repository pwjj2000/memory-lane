import { useHistory } from 'react-router-dom'

function ZhaNewGame() {
    const history = useHistory()

    return (
        <div className="Zha">
            <img src="./zha logo.png" class="new-game-menu"/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <button class="hidden-button">
                <img src='./create room transparent.png' class="create-room-button" alt="create room" onClick={() => history.push('/zha-create-room')}/>
            </button>
            <button class="hidden-button" onClick={() => history.push('/zha-join-room')}>
                <img src="./join room.png" class="join-room-button" alt="join room" />
            </button>
            <br/>
            <br/>
            <br/>
            <button onClick={() => history.push('/zha')} class="hidden-button">
            <img src="./back icon.png" class="backbutton"/>
            </button>
            <br/>
            <br/>
        </div>
    );
}

export default ZhaNewGame;