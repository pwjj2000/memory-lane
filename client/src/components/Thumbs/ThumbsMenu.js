import '../../styles.css'
import React from 'react'
import { useHistory } from 'react-router-dom';

export default function ThumbsMenu() {
    const history = useHistory();
    return (
        <div>
            <h2>Thumbs</h2>
            <ul className='menu'>
                <li>
                    <button onClick={() => history.push('/thumbs-new-game')}>New Game</button>
                </li>

                <li>
                    <button>Tutorial</button>
                </li>

                <li>
                    <button onClick={() => history.push('/thumbs-leaderboard')}>Leaderboard</button>
                </li>

                <li>
                    <button onClick={() => history.push('/')}>Back</button>
                </li>
            </ul>
        </div>
    )
}