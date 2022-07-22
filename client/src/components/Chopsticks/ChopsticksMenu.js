import '../../styles.css'
import { useHistory } from 'react-router-dom';
import React from 'react'

export default function ChopsticksMenu() {
    const history = useHistory();
    return (
        <div>
            <img src='./Chopsticks logo.png' className='menu-logo' alt="Chopsticks Logo"/>
            <h2>Chopsticks</h2>
            <ul className='menu'>
                <li>
                    <button onClick={() => history.push('/chopsticks-new-game')} className="hidden-button">
                        <img src="./new game.png" className="menu-button" alt="New Game"/>
                    </button>
                </li>

                <li>
                    <button onClick={() => history.push('/chopsticks-tutorial')} className="hidden-button">
                        <img src="./tutorial.png" className="menu-button" alt="Tutorial"/>
                    </button>
                </li>

                <li>
                    <button onClick={() => history.push('/chopsticks-leaderboard')} className="hidden-button">
                        <img src="./leaderboard.png" className="menu-button" alt="Leaderboard"/>
                    </button>
                </li>
                <br/>
                <br/>
                <li>
                    <button onClick={() => history.push('/')} className="hidden-button">
                    <img src="./back icon.png" className="backbutton" alt="Back"/>
                    </button>
                </li>
            </ul>
        </div>
    )
}