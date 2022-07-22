import { useHistory } from 'react-router-dom'
import { useAuth } from '../contexts/Auth'
import '../styles.css'
import React from 'react'

export default function Dashboard() {
    const { user, signOut } = useAuth()
    const history = useHistory()

    async function handleSignOut() {
      await signOut()
      history.push('/login')
    }
  
    return (
      <div className='dashboard' title='Dashboard'>
        <h3>Welcome, {user?.email}!</h3>
        <div className='games-logos'>
            <button >
              <img src='./zha logo.png' className="button-logos" alt='Zha Logo' onClick={() => history.push('/zha')}/>
            </button>
             
            <button onClick={() => history.push('/chopsticks')}>
              <img src='./Chopsticks logo.png' className="button-logos" alt='Chopsticks Logo' />
            </button>

            <button onClick={() => history.push('/thumbs')}>
              <img src='./thumbs logo.png' className="button-logos" alt='Thumbs Logo' />
            </button>
        </div>

        <div>
          <br/><br/>
        <button onClick={() => history.push('/overall-leaderboard')} className="hidden-button">
          <img src="./leaderboard.png" className="menu-button" alt="Leaderboard"/>
          </button>
        <button onClick={handleSignOut} className="hidden-button">
          <img src="./signout.png" className="signout-button" alt="Signout"/>
        </button>
        <br/><br/>
        </div>
      </div>
    )
}