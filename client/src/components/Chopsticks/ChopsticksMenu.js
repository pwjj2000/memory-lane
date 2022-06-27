import '../../styles.css'
import { useHistory } from 'react-router-dom';
import React from 'react'

export default function ChopsticksMenu() {
    const history = useHistory();
    return (
        <div>
            <h2>Chopsticks</h2>
            <ul className='menu'>
                <li>
                    <button onClick={() => history.push('/chopsticks-new-game')}>New Game</button>
                </li>

                <li>
                    <button>Tutorial</button>
                </li>

                <li>
                    <button>Leaderboard</button>
                </li>
                
                <li>
                    <button onClick={() => history.push('/')}>Back</button>
                </li>
            </ul>
        </div>
    )
}