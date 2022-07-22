import { useHistory } from 'react-router-dom'

function ChopsticksNewGame() {
    const history = useHistory()

    return (
        <div className="Chopsticks">
            <img src="./Chopsticks logo.png" className ='new-game-menu' alt="Chopsticks Logo"/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <button onClick={() => history.push('/chopsticks-create-room')} className='hidden-button'>
                <img src='./create room transparent.png' className='create-room-button' alt="Create Room"/>
            </button>
            <button onClick={() => history.push('/chopsticks-join-room')} className='hidden-button'>
                <img src="./join room.png" className='join-room-button' alt="Join Room"/>
            </button>
            <br/>
            <br/>
            <br/>
            <button onClick={() => history.push('/chopsticks')} className="hidden-button">
            <img src="./back icon.png" className="backbutton" alt="Back"/>
            </button>
            <br/>
            <br/>
        </div>
    );
}

export default ChopsticksNewGame;