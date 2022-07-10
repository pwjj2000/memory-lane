import '../../styles.css'
import { useHistory } from 'react-router-dom';
import React from 'react'

function ThumbsTutorial() {
    const history = useHistory();

    return (
        <div>
            <h2>Thumbs Tutorial</h2>
            <div class = "tutorial-game-logo">
                <img src="./thumbs logo.png"/>
            </div>

            <div class="zha-tutorial-icon">
                <h3>Objective</h3>
                <p>The objective of the game is to guess the correct number of thumbs raised in the round twice.</p>
            </div>

            <div>
                <h3>Raising thumbs</h3>
                <p>During each round, each player can decide whether or not to raise or lower their remaining thumbs.</p>
                <img src="./raised thumb.png"/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="./dash.png"/>
            </div>

            <div>
                <h3>Calling the number of thumbs</h3>
                <p>On each turn, the attacking player gets to call a number (between 0 and the total number of thumbs remaining). If the total number of thumbs raised that round is equal to the number called, the attacking player wins the round and gets to put down one hand. The total number of thumbs in the game then decreases by one.</p>

               
            </div>

            <div>
                <h3>Gameplay</h3>
                <p>The game continues and the role of attacker switches between the two players. The game ends when someone puts down both hands.</p>
            </div>

            <div>
                <h3>Now you're ready!</h3>
                <p>Try a game now and best your opponents!</p>
                <br/>
                <br/>
            </div>

            <div>
                <button onClick={() => history.push('/thumbs')} class='hidden-button'>
                    <img src="./back icon.png" class="backbutton"/>
                </button>
            </div>
            <br/>
            <br/>
        </div>
    );
}

export default ThumbsTutorial;