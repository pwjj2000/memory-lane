import { useHistory } from 'react-router-dom'
import { useAuth } from '../contexts/Auth'
import '../styles.css'
import React from 'react'

export function Dashboard() {
    const { user, signOut } = useAuth()
    const history = useHistory()

    async function handleSignOut() {
      await signOut()
      history.push('/login')
    }
  
    return (
      <div className='dashboard'>
        <h3>Welcome, {user?.email}!</h3>
        <div className='games-logos'>
            <button >
              <img src='./zha logo.png' class="button-logos" alt='Zha Logo' onClick={() => history.push('/zha')}/>
            </button>
             
            <button onClick={() => history.push('/chopsticks')}>
              <img src='./Chopsticks logo.png' class="button-logos" alt='Chopsticks Logo' />
            </button>

            <button onClick={() => history.push('/thumbs')}>
              <img src='./thumbs logo.png' class="button-logos" alt='Thumbs Logo' />
            </button>
        </div>

        <div>
          <br/><br/>
        <button onClick={() => history.push('/overall-leaderboard')} class="hidden-button">
          <img src="./leaderboard.png" class="menu-button"/>
          </button>
        <button onClick={handleSignOut} class="hidden-button">
          <img src="./signout.png" class="signout-button"/>
        </button>
        <br/><br/>
        </div>
      </div>
    )
}