import React, { useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { useAuth } from '../contexts/Auth'

export function Signup() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const { signUp } = useAuth()
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()
    const { error } = await signUp({ email, password })

    if (error) {
      alert('error signing up')
    } else {
      history.push('/')
    }
  }

  return (
    <div title='Signup'>
      <form onSubmit={handleSubmit}>
        <label htmlFor="input-email">Email</label>
        <input id="input-email" type="email" onChange={(event) => setEmail(event.target.value)}/>

        <label htmlFor="input-password">Password</label>
        <input id="input-password" type="password" onChange={(event) => setPassword(event.target.value)}/>
        <br />
        <button type="submit">Sign up</button>
      </form>
      <br />
      <p>
        Already have an account? <Link to="/login">Log In</Link>
      </p>
    </div>
  )
}