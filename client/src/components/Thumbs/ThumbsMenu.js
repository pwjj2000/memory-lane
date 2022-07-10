import '../../styles.css'
import React from 'react'
import { useHistory } from 'react-router-dom';

export default function ThumbsMenu() {
    const history = useHistory();
    return (
        <div>
            <img src='./thumbs logo.png' class='menu-logo' />
            <h2>Thumbs</h2>
            <ul className='menu'>
                <li>
                    <button onClick={() => history.push('/thumbs-new-game')} class="hidden-button">
                        <img src="./new game.png" class="menu-button"/>
                    </button>
                </li>

                <li>
                    <button onClick={() => history.push('./thumbs-tutorial')} class="hidden-button">
                        <img src="./tutorial.png" class="menu-button"/>
                    </button>
                </li>

                <li>
                    <button onClick={() => history.push('./thumbs-leaderboard')} class="hidden-button">
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