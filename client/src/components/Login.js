import React, { useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { useAuth } from '../contexts/Auth'


export function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const { logIn } = useAuth()
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()
    const { error } = await logIn({ email, password })

    if (error) {
      alert('error signing in')
    } else {
      history.push('/')
    }
  } 

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="input-email">Email</label>
        <input id="input-email" type="email" onChange={(event) => setEmail(event.target.value)}/>

        <label htmlFor="input-password">Password</label>
        <input id="input-password" type="password" onChange={(event) => setPassword(event.target.value)}/>
        <br />
        <button type="submit">Login</button>
      </form>
      <br />
      <p>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </>
  )
}