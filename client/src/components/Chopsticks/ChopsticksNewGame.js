import { useHistory } from 'react-router-dom'

function ChopsticksNewGame() {
    const history = useHistory()

    return (
        <div className="Chopsticks">
            <img src="./Chopsticks logo.png" class ='new-game-menu' />
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <button onClick={() => history.push('/chopsticks-create-room')} class='hidden-button'>
                <img src='./create room transparent.png' class='create-room-button'/>
            </button>
            <button onClick={() => history.push('/chopsticks-join-room')} class='hidden-button'>
                <img src="./join room.png" class='join-room-button' />
            </button>
            <br/>
            <br/>
            <br/>
            <button onClick={() => history.push('/chopsticks')} class="hidden-button">
            <img src="./back icon.png" class="backbutton"/>
            </button>
            <br/>
            <br/>
        </div>
    );
}

export default ChopsticksNewGame;