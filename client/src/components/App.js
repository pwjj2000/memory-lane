import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { Signup } from './Signup'
import { Login } from './Login'
import { Dashboard } from './Dashboard'
import { PrivateRoute } from './PrivateRoute'
import { AuthProvider } from '../contexts/Auth'
import ZhaMenu from './Zha/ZhaMenu'
import ZhaNewGame from './Zha/ZhaNewGame';
import ZhaCreateRoom from './Zha/ZhaCreateRoom';
import ZhaJoinRoom from './Zha/ZhaJoinRoom';
import ZhaGame from './Zha/ZhaGame';
import ChopsticksMenu from './Chopsticks/ChopsticksMenu'
import ChopsticksCreateRoom from './Chopsticks/ChopsticksCreateRoom';
import ChopsticksJoinRoom from './Chopsticks/ChopsticksJoinRoom';
import ChopsticksNewGame from './Chopsticks/ChopsticksNewGame';
import ChopsticksGame from './Chopsticks/ChopsticksGame';
import { ThumbsMenu } from './Thumbs/Menu'


export default function App() {
  return (
    <div>
      <img src="./images/banner.png" class="memorylane-logo" />
      <Router>
        <AuthProvider>
          <Switch>
            
            <PrivateRoute exact path="/" component={Dashboard} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />

            <PrivateRoute exact path="/zha" component={ZhaMenu} />
            <PrivateRoute exact path="/zha-new-game" component={ZhaNewGame} />
            <PrivateRoute exact path="/zha-create-room" component={ZhaCreateRoom} />
            <PrivateRoute exact path="/zha-join-room" component={ZhaJoinRoom} />
            <PrivateRoute exact path="/zha-game" component={ZhaGame} />

            <PrivateRoute exact path="/chopsticks" component={ChopsticksMenu} />
            <PrivateRoute exact path="/chopsticks-new-game" component={ChopsticksNewGame} />
            <PrivateRoute exact path="/chopsticks-create-room" component={ChopsticksCreateRoom} />
            <PrivateRoute exact path="/chopsticks-join-room" component={ChopsticksJoinRoom} />
            <PrivateRoute exact path="/chopsticks-game" component={ChopsticksGame} />

            <PrivateRoute exact path="/thumbs" component={ThumbsMenu} />
          </Switch>
        </AuthProvider>
      </Router>
    </div>
  )
}