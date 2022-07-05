import '../../styles.css'
import { useHistory } from 'react-router-dom';
import React from 'react'

export default function ChopsticksMenu() {
    const history = useHistory();
    return (
        <div>
            <img src='./Chopsticks logo.png' class='menu-logo' />
            <h2>Chopsticks</h2>
            <ul className='menu'>
                <li>
                    <button onClick={() => history.push('/chopsticks-new-game')} class="hidden-button">
                        <img src="./new game.png" class="menu-button"/>
                    </button>
                </li>

                <li>
                    <button onClick={() => history.push('/chopsticks-tutorial')} class="hidden-button">
                        <img src="./tutorial.png" class="menu-button"/>
                    </button>
                </li>

                <li>
                    <button class="hidden-button">
                        <img src="./leaderboard.png" class="menu-button"/>
                    </button>
                </li>
                <br/>
                <br/>
                <li>
                    <button onClick={() => history.push('/')} class="hidden-button">
                    <img src="./back icon.png" class="backbutton"/>
                    </button>
                </li>
            </ul>
        </div>
    )
}