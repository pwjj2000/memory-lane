import '../../styles.css'
import { useHistory } from 'react-router-dom';
import React from 'react'

function ChopsticksTutorial() {
    const history = useHistory();
    return (
        <div>
            <h2>Chopsticks Tutorial</h2>
            <div class = "tutorial-game-logo">
            <img src="./Chopsticks logo.png"/>
            </div>

            <div>
                <h3>Objective</h3>
                <p>The objective of the game is to defeat both of your opponent's hands by "attacking" (increasing the value) of their hands while ensuring that your own hands stay alive. </p>
            </div>
            <div class="cs-tutorial-icon">
                <h3>Hands</h3>
                <p>Each hand can take the value of 1, 2, 3 or 4 which is indicated by the number of fingers raised by each hand. Once the value of the hand reaches 5 or above, the hand is considered "defeated".</p>
                <img src="./one finger.png"/><img src="two finger.png"/><img src="./three finger.png"/><img src = "./four finger.png"/>
            </div>

            <div class ="cs-tutorial-icon">
                <h3>Gameplay</h3>
                <p>Each player starts with both hands of value one.</p>
                <img src="./one finger.png"/><img src="./one finger.png"/><br/>
                <p>Players then take turns to make moves until one player has both hands defeated. On the attacking player's turn, the attacking player can either choose to attack or split. A defeated hand cannot make any attacks.</p>
            </div>

            <div>
                <h3>Attacking</h3>
                <p>On each turn, the attacking player can use one hand to "attack" another hand. When this happens, the new value of the hand being attacked is the original value plus the value of the attacking hand. For instance, if hand A of value 1 attacks hand B of value 2, the resultant value of hand B is 3. The value of the attacking hand (hand A) does not change.</p>
                <p>The attacking player can attack the opponent's hands, and can attack their own hand as well (provided the other hand hasn't been defeated).</p>
            </div>

            <div>
                <h3>Splitting</h3>
                <p>When the attacking player splits, the combined value of their hands is split evenly among both hands. For instance, if player's hands are of value 3 and 1, splitting will result in the values of both hands becoming 2.</p>
                <p>Splitting can be used to revive a defeated hand. For instance, if the player only has one hand left with value 2, splitting will result in both hands having the value 1.</p>
            </div>

            <div>
                <h3>Now you're ready!</h3>
                <p>Using a combination of attacking and splitting, try to outwit your opponent and beat them! Try a game now!</p>
            </div>
            <br/>
            <br/>
            <div>
                <button onClick={() => history.push('/chopsticks')} class='hidden-button'>
                <img src="./back icon.png" class="backbutton"/>
                </button>
            </div>
            <br/>
            <br/>

            
        </div>
        
    );
}

export default ChopsticksTutorial;

