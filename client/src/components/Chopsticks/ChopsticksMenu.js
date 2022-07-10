import '../../styles.css'
import { useHistory } from 'react-router-dom';
import React from 'react'

export default function ChopsticksMenu() {
    const history = useHistory();
    return (
        <div>
            <img src='./Chopsticks logo.png' class='menu-logo' alt="Chopsticks Logo"/>
            <h2>Chopsticks</h2>
            <ul className='menu'>
                <li>
                    <button onClick={() => history.push('/chopsticks-new-game')} class="hidden-button">
                        <img src="./new game.png" class="menu-button" alt="New Game"/>
                    </button>
                </li>

                <li>
                    <button onClick={() => history.push('/chopsticks-tutorial')} class="hidden-button">
                        <img src="./tutorial.png" class="menu-button" alt="Tutorial"/>
                    </button>
                </li>

                <li>
                    <button onClick={() => history.push('/chopsticks-leaderboard')} class="hidden-button">
                        <img src="./leaderboard.png" class="menu-button" alt="Leaderboard"/>
                    </button>
                </li>
                <br/>
                <br/>
                <li>
                    <button onClick={() => history.push('/')} class="hidden-button">
                    <img src="./back icon.png" class="backbutton" alt="Back"/>
                    </button>
                </li>
            </ul>
        </div>
    )
}