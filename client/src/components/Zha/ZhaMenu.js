import '../../styles.css'
import { useHistory } from 'react-router-dom';
import React from 'react'

export default function ZhaMenu() {
    const history = useHistory();
    return (
        <div title='ZhaMenu'>
            <div>
            <img src='./zha logo.png' className='menu-logo' alt="Zha Logo"/> 
            </div>
           
            <h2>Zha</h2>
            <ul className='menu'>
                <li>
                    <button onClick={() => history.push('/zha-new-game')} className="hidden-button">
                        <img src="./new game.png" className="menu-button" alt="New Game"/>
                    </button>
                </li>

                <li>
                    <button onClick={() => history.push('/zha-tutorial')} className="hidden-button">
                       <img src="./tutorial.png" className="menu-button" alt="Tutorial"/>
                    </button>
                </li>

                <li>
                    <button onClick={() => history.push('/zha-leaderboard')} className="hidden-button">
                        <img src="./leaderboard.png" className="menu-button" alt="Leaderboard"/>
                    </button>
                </li>
                <br/>
                <br/>
                <li>
                    <button onClick={() => history.push('/')} className='hidden-button'>
                    <img src="./back icon.png" className="backbutton" alt="Back"/>
                    </button>
                </li>
            </ul>
        </div>
    )
}