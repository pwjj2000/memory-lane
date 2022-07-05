import '../../styles.css'
import React from 'react'
import { useHistory } from 'react-router-dom';

export function ThumbsMenu() {
    const history = useHistory();
    return (
        <div>
            <img src='./thumbs logo.png' class='menu-logo'/>
            <h2>Thumbs</h2>
            <ul className='menu'>
                <li>
                    <button>New Game</button>
                </li>

                <li>
                    <button>Tutorial</button>
                </li>

                <li>
                    <button>Leaderboard</button>
                </li>
            <br/>
            <br/>

                <li>
                    <button onClick={() => history.push('/')} class="backbutton">Back</button>
                </li>
            </ul>
        </div>
    )
}