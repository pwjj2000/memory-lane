import { useHistory } from 'react-router-dom'

function ZhaNewGame() {
    const history = useHistory()

    return (
        <div className="Zha" title="ZhaNewGame">
            <img src="./zha logo.png" className="new-game-menu" alt="Zha Logo"/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <button className="hidden-button">
                <img src='./create room transparent.png' className="create-room-button" alt="create room" onClick={() => history.push('/zha-create-room')}/>
            </button>
            <button className="hidden-button" onClick={() => history.push('/zha-join-room')}>
                <img src="./join room.png" className="join-room-button" alt="join room" />
            </button>
            <br/>
            <br/>
            <br/>
            <button onClick={() => history.push('/zha')} className="hidden-button">
            <img src="./back icon.png" className="backbutton" alt="Back"/>
            </button>
            <br/>
            <br/>
        </div>
    );
}

export default ZhaNewGame;