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
import ZhaTutorial from './Zha/ZhaTutorial';
import ZhaGame from './Zha/ZhaGame';
import ChopsticksMenu from './Chopsticks/ChopsticksMenu'
import ChopsticksCreateRoom from './Chopsticks/ChopsticksCreateRoom';
import ChopsticksJoinRoom from './Chopsticks/ChopsticksJoinRoom';
import ChopsticksNewGame from './Chopsticks/ChopsticksNewGame';
import ChopsticksGame from './Chopsticks/ChopsticksGame';
import ChopsticksTutorial from './Chopsticks/ChopsticksTutorial';
import ThumbsMenu from './Thumbs/ThumbsMenu';
import ThumbsCreateRoom from './Thumbs/ThumbsCreateRoom';
import ThumbsJoinRoom from './Thumbs/ThumbsJoinRoom';
import ThumbsNewGame from './Thumbs/ThumbsNewGame';
import ThumbsGame from './Thumbs/ThumbsGame';
import ThumbsTutorial from './Thumbs/ThumbsTutorial';
import OverallLeaderboard from './Leaderboard/OverallLeaderboard';
import ZhaLeaderboard from './Leaderboard/ZhaLeaderboard';
import ChopsticksLeaderboard from './Leaderboard/ChopsticksLeaderboard';
import ThumbsLeaderboard from './Leaderboard/ThumbsLeaderboard';


export default function App() {
  return (
    <div>
      <img src="./banner.png" className="memorylane-logo" alt="Banner"/>
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
            <PrivateRoute exact path="/zha-tutorial" component={ZhaTutorial} />
            <PrivateRoute exact path="/zha-game" component={ZhaGame} />

            <PrivateRoute exact path="/chopsticks" component={ChopsticksMenu} />
            <PrivateRoute exact path="/chopsticks-new-game" component={ChopsticksNewGame} />
            <PrivateRoute exact path="/chopsticks-create-room" component={ChopsticksCreateRoom} />
            <PrivateRoute exact path="/chopsticks-join-room" component={ChopsticksJoinRoom} />
            <PrivateRoute exact path="/chopsticks-game" component={ChopsticksGame} />
            <PrivateRoute exact path="/chopsticks-tutorial" component ={ChopsticksTutorial} />

            <PrivateRoute exact path="/thumbs" component={ThumbsMenu} />
            <PrivateRoute exact path="/thumbs-new-game" component={ThumbsNewGame} />
            <PrivateRoute exact path="/thumbs-create-room" component={ThumbsCreateRoom} />
            <PrivateRoute exact path="/thumbs-join-room" component={ThumbsJoinRoom} />
            <PrivateRoute exact path="/thumbs-game" component={ThumbsGame} />
            <PrivateRoute exact path="/thumbs-tutorial" component={ThumbsTutorial} />

            <PrivateRoute exact path="/overall-leaderboard" component={OverallLeaderboard} />
            <PrivateRoute exact path="/zha-leaderboard" component={ZhaLeaderboard} />
            <PrivateRoute exact path="/chopsticks-leaderboard" component={ChopsticksLeaderboard} />
            <PrivateRoute exact path="/thumbs-leaderboard" component={ThumbsLeaderboard} />
          </Switch>
        </AuthProvider>
      </Router>
    </div>
  )
}