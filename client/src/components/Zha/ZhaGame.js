import { useLocation, useHistory } from 'react-router-dom'
import {io} from 'socket.io-client'
import {useEffect, useState} from 'react'
import "../../styles.css"
import { supabase } from '../../supabase'

// const socket = io.connect("http://localhost:3001")
const socket = io.connect("https://memorylane-app-complete.herokuapp.com/")

function ZhaGame() {
    //Router Stuff
    const history = useHistory()
    const location = useLocation()
    const type = location.state.type
    const game = location.state.game

    //Room
    const [received, setReceived] = useState("")
    const [error, setError] = useState(false)
    const [confirmed, setConfirmed] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [waiting, setWaiting] = useState(true)
    const [room, setRoom] = useState(location.state.roomID)

    //Game
    const [overall, setOverall] = useState(null)
    const [score, setScore] = useState(null)
    const [choice1, setChoice1] = useState("")
    const [choice2, setChoice2] = useState("")
    const [player, setPlayer] = useState(1)
    const [attacker, setAttacker] = useState(true)
    const [lives1, setLives1] = useState(2)
    const [lives2, setLives2] = useState(2) 
    const [locked, setLocked] = useState(false)
    const [end, setEnd] = useState(false)

    const [chosen1A, setChosen1A] = useState("")
    const [chosen1B, setChosen1B] = useState("")
    const [chosen2A, setChosen2A] = useState("")
    const [chosen2B, setChosen2B] = useState("")
    const [result1, setResult1] = useState("")
    const [result2, setResult2] = useState("")
    const [result3, setResult3] = useState("")
    const [result4, setResult4] = useState("")


    useEffect(() => {
        getScore()
    }, [])

    //Socket
    useEffect(() => {
        socket.on("display-error", (data) => {
            setError(true)
            setErrorMessage(data)
        })

        socket.on("room-created", (data) => {
            setError(false)
            setErrorMessage("")
            setReceived("Room Created: " + data.room)
        })

        socket.on("room-joined", (data) => {
            setError(false)
            setErrorMessage("")
            setWaiting(false)
            setRoom(data.room)
            setReceived("Room " + data.room + " filled. Game starts!")
        })

        socket.on("player-2-joined", () => {
            setPlayer(2)
            setAttacker(false)
        })

        socket.on("player-1-disconnected", () => {
            setReceived("")
            setError(true)
            setErrorMessage("Room creator disconnected. Returning to Create/Join Room in 5 seconds...")
            setTimeout(() => {
                history.push('zha-new-game')
            }, 5000)
            
        })

        socket.on("player-2-disconnected", () => {
            reset()
        })

        socket.on("zha-end-turn", (data) => {
            setResult1(data.result1)
            setResult2(data.result2)
            setResult3(data.result3)
            setResult4(data.result4)
            setChosen1A(data.p1c1)
            setChosen1B(data.p1c2)
            setChosen2A(data.p2c1)
            setChosen2B(data.p2c2)
            setLives1(data.newLives1)
            setLives2(data.newLives2)
            setLocked(false)
            updateAttacker()
            if (player === 1) {
                if (data.newLives1 === 2) {
                    setChoice1("")
                    setChoice2("")
                } else if (data.newLives1 === 1) {
                    setChoice1("")
                    setChoice2("DEAD")
                } else {
                    setChoice1("DEAD")
                    setChoice2("DEAD")
                }
            } else {
                if (data.newLives2 === 2) {
                    setChoice1("")
                    setChoice2("")
                } else if (data.newLives2 === 1) {
                    setChoice1("")
                    setChoice2("DEAD")
                } else {
                    setChoice1("DEAD")
                    setChoice2("DEAD")
                }
            }
        })

        socket.on("zha-end", (data) => {
            const loser = data.player
            const winner = loser === 1 ? 2 : 1
            console.log(player)
            console.log(winner)
            const winMessage = "Player " + loser + " ran out of lives. Player " + winner + " wins. Returning to Create/Join Room..."
            setReceived(winMessage)
            setEnd(true)
            if (player === 1 && winner === 1) {
                console.log("p1w1")
                updateScore()
            }
            if (player === 2 && winner === 2) {
                console.log("p2w2")
                updateScore()
            }
            setTimeout(() => {
                history.push('zha-new-game')
            }, 5000)
        })

        return () => {
            socket.removeAllListeners();
        };
    }, [updateAttacker, resetChoices, end])
    
    async function getScore() {
        const { data } = await supabase
            .from('leaderboard')
            .select()
            .eq('id', supabase.auth.user().id)
        setOverall(data[0].overall)
        setScore(data[0].zha)
    }

    async function updateScore() {
        const { data, error } = await supabase
            .from('leaderboard')
            .update({ overall: overall + 1 })
            .eq('id', supabase.auth.user().id) //update overall score
        const { data1, error1 } = await supabase
            .from('leaderboard')
            .update({ zha: score + 1 })
            .eq('id', supabase.auth.user().id) //update zha score
        setOverall(overall + 1)
        setScore(score + 1)
    }

    function handleConfirm() {
        if (type === "create") {
            socket.emit("create-room", {room, game})
            setConfirmed(true)
        } else if (type === "join") {
            socket.emit("join-room", {room, game})
            setConfirmed(true)
        } else {
            socket.emit("join-random", {game})
            setConfirmed(true)
        }
    }

    function handleBack() {
        history.push('/zha-new-game')
    }

    //DOM Elements
    function ConfirmMessage() {
        if (error || confirmed) {
            return null
        } else {
            return (
                <>
                    <p>Confirm Enter Room {room}? </p>
                </>
            )
        }
    }

    function ConfirmButton() {
        if (error || confirmed) {
            return null;
        } else {
            return (
                <>
                    <button onClick={handleConfirm} class="hidden-button">
                        <img src="./confirm.png" class="confirm-button"/>
                    </button>
                </>
            )
        }
    }
    
    function BackButton() {
        return (
            <>
                <br/>
                <button onClick={handleBack} class="hidden-button">
                    <img src="back icon.png" class="backbutton"/>
                </button>
            </>
        )
    }
    
    function WaitMessage() {
        if (waiting && !error && confirmed) {
            return (
                <>
                    <p>"Waiting for another player to join..."</p>
                </>
            )
        } else {
            return null
        }
    }

    function Game() {
        if (!waiting && !error && confirmed && !end) {
            return (
                <>
                <body>
                <div>
                <h4>You are {player === 1 ? "Player 1" : "Player 2"}</h4>
                {attacker ? <img src= "./attacking.png" class="zha-attacking"/> : <img src="./defending.png" class="zha-attacking"/>}
                <div class="cs-lives">
                <h5>Lives:</h5>
                    {player === 1 ? <b>you:</b>: <b>opponent:</b>} 
                    {lives1 === 2 ? <img src="./two heart.png"/>
                    : lives1 === 1 ? <img src="./heart.png"/>
                    : ""}
                    <br />
                    {player === 2 ? <b>you:</b> : <b>opponent:</b>} 
                    {lives2 === 2 ? <img src="./two heart.png"/>
                    : lives2 === 1 ? <img src="./heart.png"/>
                    : ""}
                    <br/>
                </div>
                <div>
                    <img src="./zha legend.png" class="zha-legend"/>
                </div>
                </div>
                
                <h5>Make your choice:</h5>
                    <div className='zha-game'>
                        <button onClick={() => choose("Plane")} class="hidden-button">
                            <img src='./plane icon.png' class="zha-choice-plane" alt='Plane' />
                        </button>
    
                        <button onClick={() => choose("Human")} class="hidden-button">
                            <img src='./human icon.png' class="zha-choice-human" alt='Human' />
                        </button>
    
                        <button onClick={() => choose("Bomb")} class="hidden-button">
                            <img src='./bomb icon.png' class="zha-choice-bomb" alt='Bomb' />
                        </button>
                    </div>
                
    
                    <div className='my-choices'>
                        <h5>Your choices:</h5>
                        <span>{choice1}</span>
                        <span>{choice2}</span>
                    </div>
    
                    <br/>
                    <div>
                        {locked ? null : <button onClick={() => submitChoices()} class="hidden-button">
                            <img src="./lockin.png" class="zha-lockin" alt="lock in"/>
                            </button>}
                        {locked ? null : <button onClick={() => resetChoices()} class="hidden-button">
                            <img src="./reset.png" class="zha-reset" alt="reset"/>
                            </button>}
                    </div>

                    <br />
                    

                    <h5>Result:</h5>
                    <div class = "zha-result">
                     {player === 1 ? <b>you:</b> : <b>opponent:</b>}
                        <span>{chosen1A}</span>
                        <span>{chosen1B}</span>
                    </div>
                    <br/>

                    <div className='zha-result'>
                    {player === 2 ? <b>you:</b> : <b>opponent:</b>}
                        <span>{chosen2A}</span>
                        <span>{chosen2B}</span>
                    </div>
                    <br/>
                    <h5>Log:</h5>
                    
                    <div class='zha-log'>
                        {result1}
                        <br />
                        {result2}
                        <br />
                        {result3}
                        <br />
                        {result4}
                    </div>

                    <br/>
                    <br/>

                   </body>
                  
                </>
            ) 
        } else {
            return null
        }
       
    }

    //Functions
    function reset() {
        setReceived("Player disconnected.")
        setError(false)
        setConfirmed(true)
        setErrorMessage("")
        setWaiting(true)
    
        //Game
        setChoice1("")
        setChoice2("")
        setPlayer(1)
        setAttacker(true)
        setLives1(2)
        setLives2(2)
    }

    function resetChoices() {
        if (player === 1) {
            if (lives1 === 2) {
                setChoice1("")
                setChoice2("")
            } else if (lives1 === 1) {
                setChoice1("")
                setChoice2("DEAD")
            } else {
                setChoice1("DEAD")
                setChoice2("DEAD")
            }
        } else {
            if (lives2 === 2) {
                setChoice1("")
                setChoice2("")
            } else if (lives2 === 1) {
                setChoice1("")
                setChoice2("DEAD")
            } else {
                setChoice1("DEAD")
                setChoice2("DEAD")
            }
        }
    }

    function choose(choice) {
        if (player === 1) {
            if (locked) {
                //do nothing
            } else if (lives1 === 2) {
                choose2(choice)
            } else {
                choose1(choice)
            }
        } else {
            if (locked) {
                //do nothing
            } else if (lives2 === 2) {
                choose2(choice)
            } else {
                choose1(choice)
            }
        }
    }
    
    function choose1(choice) {
        setChoice1(choice)
    }
    
    
    function choose2(choice) {
        if (choice1 === "") {
            setChoice1(choice)
        } else if (choice2 === "") {
            setChoice2(choice)
        } else {
            setChoice1(choice2)
            setChoice2(choice)
        }
    }

    function submitChoices() {
        if (player === 1) {
            if ((lives1 === 2 && (choice1 === "" || choice2 === "")) || (lives1 === 1 && choice1 === "")) {
                const error = "No options chosen. Please choose an option before confirming."
                socket.emit("display-error", error)
            } else {
                setLocked(true)
                socket.emit("zha-submit", {choice1, choice2, player, attacker, lives1, lives2, room})
            }
        } else {
            if ((lives2 === 2 && (choice1 === "" || choice2 === "")) || (lives2 === 1 && choice1 === "")) {
                const error = "No options chosen. Please choose an option before confirming."
                socket.emit("display-error", error)
            } else {
                setLocked(true)
                socket.emit("zha-submit", {choice1, choice2, player, attacker, lives1, lives2, room})
            }
        }
    }
    
    function updateAttacker() {
        if (attacker) {
            setAttacker(false)
        } else {
            setAttacker(true)
        }
    }

    return (
        <>
            Overall Score: {overall}
            <br />
            Zha Score: {score}
            <br/>
            <br/>
            Tips:
            <div>
                <ul>
                    <li>First player to 0 Lives LOSES!</li>
                    <li>Predict what combinations your opponent will pick, and pick combinations that counter it!</li>
                </ul>
            </div>
            <br/>
            <ConfirmMessage />  
            <p style={{color: "green"}}>{received}</p>
            <p style={{color: "red"}}>{errorMessage}</p>
            <WaitMessage />
            <div>
                <ConfirmButton />           
                <BackButton />
            </div>
            <br/>
           <Game />
        </>
    )
}

export default ZhaGame