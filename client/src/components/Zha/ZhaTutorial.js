import '../../styles.css'
import { useHistory } from 'react-router-dom';
import React from 'react'

function ZhaTutorial() {
    const history = useHistory();

    return (
        <div>
            <h2>Zha Tutorial</h2>
            <div class = "tutorial-game-logo">
                <img src="./zha logo.png"/>
            </div>

            <div class="zha-tutorial-icon">
                <h3>Objective</h3>
                <p>The objective of the game is defeat both of your opponent's lives by choosing between 3 elements: plane, human and bomb:</p>
                <img src="./plane icon.png"/><img src="human icon.png"/><img src="bomb icon.png"/>
            </div>

            <div>
                <h3>Elements</h3>
                <p>Each element is able to defeat one another:</p>
                <ul>
                    <li>Plane defeats Human</li>
                    <li>Human defeats Bomb</li>
                    <li>Bomb defeats human</li>
                </ul>
            </div>

            <div>
                <h3>Lives</h3>
                <p>Each player begins with 2 lives. On each turn, the maximum number of lives the defending player can lose is the number of lives the attacking player has. </p>
                <p>The game ends when one of the players has 0 lives.</p>
            </div>

            <div>
                <h3>Gameplay</h3>
                <p>On each turn, one player is the attacking player while the other player is the defending player. Both players will choose an element for each life they have. (ie. if you have 1 life, you can choose one element, if you have 2 lives you can choose 2.)</p>
                <p>If one of the attacking player's elements defeats one of the defending player's elements, the defending player loses a life. </p>
                <p>On the next turn, the players switch roles. The game carries on until one of the players loses both lives.</p>
            </div>

            <div>
                <h3>Now you're ready!</h3>
                <p>Try a game now and best your opponents!</p>
                <br/>
                <br/>
            </div>

            <div>
                <button onClick={() => history.push('/zha')} class='hidden-button'>
                    <img src="./back icon.png" class="backbutton"/>
                </button>
            </div>
            <br/>
            <br/>
        </div>
    );
}

export default ZhaTutorial;