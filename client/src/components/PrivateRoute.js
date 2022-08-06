import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import { useAuth } from '../contexts/Auth'

export function PrivateRoute({ component: Component, ...others }) {
  const { user } = useAuth()

  return (
    <Route {...others} 
      render={(props) => {
        if (user) {
          return <Component {...props} />
        } else {
          return <Redirect to="/login" />
        }
      }}></Route>
  )
}