import { useLocation, useHistory } from 'react-router-dom'
import {io} from 'socket.io-client'
import {useEffect, useState} from 'react'
import "../../styles.css"
import { supabase } from '../../supabase'

// const socket = io.connect("http://localhost:3001")
const socket = io.connect("https://memorylane-app-complete.herokuapp.com/")

function ThumbsGame() {
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
    const [player, setPlayer] = useState(1)
    const [choice1, setChoice1] = useState("") //raised, lowered, DEAD
    const [choice2, setChoice2] = useState("") //raised, lowered, DEAD
    const [yourNumber, setYourNumber] = useState(null)
    const [attacker, setAttacker] = useState(true)
    const [lives1, setLives1] = useState(2)
    const [lives2, setLives2] = useState(2) 
    const [total, setTotal] = useState(4)
    const [locked, setLocked] = useState(false)
    const [end, setEnd] = useState(false)

    const [thumb1A, setThumb1A] = useState("")
    const [thumb1B, setThumb1B] = useState("")
    const [thumb2A, setThumb2A] = useState("")
    const [thumb2B, setThumb2B] = useState("")
    const [log, setLog] = useState("")
    const [thumbsRaised, setThumbsRaised] = useState(null)
    const [resultNumber, setResultNumber] = useState(null)

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
                history.push('thumbs-new-game')
            }, 5000)
            
        })

        socket.on("player-2-disconnected", () => {
            reset()
        })

        socket.on("thumbs-end", (data) => {
            const winner = data.winner
            const winMessage = "Player " + winner + " wins. Returning to Create/Join Room..."
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
                history.push('thumbs-new-game')
            }, 5000)
        })

        socket.on("thumbs-end-turn", (data) => {
            //{p1c1, p1c2, p2c1, p2c2, newLives1, newLives2, log}
            setThumb1A(data.p1c1)
            setThumb1B(data.p1c2)
            setThumb2A(data.p2c1)
            setThumb2B(data.p2c2)
            setLives1(data.newLives1)
            setLives2(data.newLives2)
            setTotal(data.newLives1 + data.newLives2)
            setResultNumber(data.num)
            setThumbsRaised(data.thumbsRaised)
            setLog(data.log)
            setLocked(false)
            updateAttacker()
            setYourNumber(null)
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
        setScore(data[0].thumbs)
    }

    async function updateScore() {
        const { data, error } = await supabase
            .from('leaderboard')
            .update({ overall: overall + 1 })
            .eq('id', supabase.auth.user().id) //update overall score
        const { data1, error1 } = await supabase
            .from('leaderboard')
            .update({ thumbs: score + 1 })
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
        history.push('/thumbs-new-game')
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

    function ChooseNumber() {
        if (attacker && !locked) {
            return (
                <>
                   <h5>Choose A Number:</h5>
                    <br />
                    <div class="thumbs-your-number">
                    Your Number: {yourNumber}
                    </div>
                    <br />
                    <div className='thumbs-options'>
                        <span><ZeroButton /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <span><OneButton />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <span><TwoButton />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <span><ThreeButton />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <span><FourButton />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                   
                    </div>
                </>
                
            )
        } else {
            return null
        }

    }

    function ZeroButton() {
        return (
            <button onClick={() => setYourNumber(0)} class="thumbs-option-button">zero</button>
        )
    }

    function OneButton() {
        return (
            <button onClick={() => setYourNumber(1)} class="thumbs-option-button">one</button>
        )
    }

    function TwoButton() {
        return (
            <button onClick={() => setYourNumber(2)} class="thumbs-option-button">two</button>
        )
    }

    function ThreeButton() {
        if (total < 3) {
            return null
        } else {
            return (
                <button onClick={() => setYourNumber(3)} class="thumbs-option-button">three</button>
            )
        }
    }

    function FourButton() {
        if (total < 4) {
            return null
        } else {
            return (
                <button onClick={() => setYourNumber(4)} class="thumbs-option-button">four</button>
            )
        }
    }
    function ChooseRaise() {
        return (
            <>
                <div>
                    Left Thumb: {choice1}
                    <br />
                    <Choose1 />
                </div>

                <div>
                    Right Thumb: {choice2}
                    <br />
                    <Choose2 />
                </div>
            </>
        )
    }

    function Choose1() {
        if ((player === 1 && lives1 === 0) || (player === 2 && lives2 === 0) || locked) {
            return null
        } else {
            return (
                <>
                    <button onClick={() => setChoice1("Raise")} class="hidden-button">
                        <img src="raise thumb button.png" />
                    </button>
                    <button onClick={() => setChoice1("Lower")} class="hidden-button">
                        <img src="lower button.png" class="thumbs-lower-button"/>
                    </button>
                </>
            )
        }
    }

    function Choose2() {
        if ((player === 1 && lives1 === 1) || (player === 2 && lives2 === 1) || locked) {
            return null
        } else {
            return (
                <>
                    <button onClick={() => setChoice2("Raise")} class="hidden-button">
                        <img src="raise thumb button.png" />
                    </button>
                    <button onClick={() => setChoice2("Lower")} class="hidden-button">
                        <img src="lower button.png" class="thumbs-lower-button"/>
                    </button>
                </>
            )
        }
    }


    function ChooseSection() {
        return (
            <div class="thumbs-choose-section">
                <h5>Choose options:</h5>
                <div class = "thumbs-choose-raise">
                <ChooseRaise />
                <br/>
                </div>
                <div>
                
                <ChooseNumber />
                </div>
                <br/>
                <div class="thumbs-submit-choices">
                        {locked ? null : <button onClick={() => submitChoices()} class="hidden-button">
                            <img src="./lockin.png" class="zha-lockin"/>
                        </button>}
                        {locked ? null : <button onClick={() => resetChoices()} class="hidden-button">
                            <img src="./reset.png" class="zha-reset"/>    
                        </button>}
                </div>
            </div>
        )
    }

    function ResultSection() {
        return (
            <div>
                <h5>Results:</h5>

                <div class = "thumbs-result">
                    Player 1  {player === 1 ? "(you)" : ""} : &nbsp;&nbsp;{thumb1A === "Raise" ? <img src="./raised thumb.png"/>
                    : thumb1A === "Lower" ? <img src="./dash.png"/> : thumb1A === "DEAD" ? "DEAD" : "" } &nbsp;&nbsp;&nbsp;
                    {thumb1B === "Raise" ? <img src="./raised thumb.png"/>
                    : thumb1B === "Lower" ? <img src="./dash.png"/> : thumb1B === "DEAD" ? "DEAD" : "" }
                    
                </div>

                <div className='thumbs-result'>
                    Player 2 {player === 2 ? "(you)" : ""} : &nbsp;&nbsp;{thumb2A === "Raise" ? <img src="./raised thumb.png"/>
                    : thumb2A === "Lower" ? <img src="./dash.png"/> : thumb2A === "DEAD" ? "DEAD" : "" } &nbsp;&nbsp;&nbsp;
                    {thumb2B === "Raise" ? <img src="./raised thumb.png"/>
                    : thumb2B === "Lower" ? <img src="./dash.png"/> : thumb2B === "DEAD" ? "DEAD" : "" }  
                </div>

                <br/><br/><br/><br/><br/>
                { thumbsRaised === resultNumber ?
                    <div>
                    <div class="thumbs-raised-correct">Number of Thumbs Raised: {thumbsRaised}</div>
                    <div class="thumbs-number-called-correct">Number Called: {resultNumber}</div>
                    </div>
                    :
                    <div>
                    <div class="thumbs-raised-wrong">Number of Thumbs Raised: {thumbsRaised}</div>
                    <div class="thumbs-number-called-wrong">Number Called: {resultNumber}</div>
                    </div>
                }
                <br/>
                <h5>log:</h5>
                <div class="zha-log">{log}</div> 
                <br/><br/>  
            </div>
        )
        
    }

    function Game() {
        if (!waiting && !error && confirmed && !end) {
            return (
                <>
                    <h4>Welcome, {player === 1 ? "Player 1" : "Player 2"}!</h4>
                    {attacker ? <img src= "./attacking.png" class="zha-attacking"/> : <img src="./defending.png" class="zha-attacking"/>}
                    <div class="cs-lives">
                        <h5>Thumbs remaining:</h5>
                        {player === 1 ? <b>you:</b>: <b>opponent:</b>} 
                        {lives1 === 2 ? <img src="./two thumb.png"/>
                        : lives1 === 1 ? <img src="./one thumb.png"/>
                        : " Winner!"}
                        <br />
                        {player === 2 ? <b>you:</b> : <b>opponent:</b>} 
                        {lives2 === 2 ? <img src="./two thumb.png"/>
                        : lives2 === 1 ? <img src="./one thumb.png"/>
                        : " Winner!"}
                        <br/>
                        <br/>
                        <br/>
                    </div>

                    <ChooseSection />
    
                    <br/>
                    
                    <ResultSection />

                    
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
        setYourNumber(null)
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

    function submitChoices() {
        if (player === 1) {
            if ((lives1 === 2 && (choice1 === "" || choice2 === "")) || (lives1 === 1 && choice1 === "") || (attacker && yourNumber === null)) {
                const error = "No options chosen. Please choose an option before confirming."
                socket.emit("display-error", error)
            } else {
                setLocked(true)
                socket.emit("thumbs-submit", {choice1, choice2, player, attacker, lives1, lives2, room, yourNumber})
            }
        } else {
            if ((lives2 === 2 && (choice1 === "" || choice2 === "")) || (lives2 === 1 && choice1 === "") || (attacker && yourNumber === null)) {
                const error = "No options chosen. Please choose an option before confirming."
                socket.emit("display-error", error)
            } else {
                setLocked(true)
                socket.emit("thumbs-submit", {choice1, choice2, player, attacker, lives1, lives2, room, yourNumber})
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
            Thumbs Score: {score}
            <br/>
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

export default ThumbsGame