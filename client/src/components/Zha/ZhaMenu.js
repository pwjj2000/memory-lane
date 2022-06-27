import '../../styles.css'
import { useHistory } from 'react-router-dom';
import React from 'react'

export default function ZhaMenu() {
    const history = useHistory();
    return (
        <div>
            <h2>Zha</h2>
            <ul className='menu'>
                <li>
                    <button onClick={() => history.push('/zha-new-game')}>New Game</button>
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