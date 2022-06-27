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
              <img src='./images/zha logo.png' class="button-logos" alt='Zha Logo' onClick={() => history.push('/zha')}/>
            </button>
          
            <button onClick={() => history.push('/chopsticks')}>
              <img src='./images/Chopsticks logo.png' class="button-logos" alt='Chopsticks Logo' />
            </button>

            <button onClick={() => history.push('/thumbs')}>
              <img src='./images/thumbs logo.png' class="button-logos" alt='Thumbs Logo' />
            </button>
        </div>
        <br/>
        <button onClick={handleSignOut}>Sign out</button>
      </div>
    )
}