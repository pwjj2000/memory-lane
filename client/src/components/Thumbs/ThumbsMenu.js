import '../../styles.css'
import React from 'react'
import { useHistory } from 'react-router-dom';

export default function ThumbsMenu() {
    const history = useHistory();
    return (
        <div title='ThumbsMenu'>
            <img src='./thumbs logo.png' className='menu-logo' alt="Thumbs Logo"/>
            <h2>Thumbs</h2>
            <ul className='menu'>
                <li>
                    <button onClick={() => history.push('/thumbs-new-game')} className="hidden-button">
                        <img src="./new game.png" className="menu-button" alt="New Game"/>
                    </button>
                </li>

                <li>
                    <button onClick={() => history.push('./thumbs-tutorial')} className="hidden-button">
                        <img src="./tutorial.png" className="menu-button" alt="Tutorial"/>
                    </button>
                </li>

                <li>
                    <button onClick={() => history.push('./thumbs-leaderboard')} className="hidden-button">
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