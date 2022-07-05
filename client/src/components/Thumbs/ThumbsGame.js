import { useLocation, useHistory } from 'react-router-dom'
import {io} from 'socket.io-client'
import {useEffect, useState} from 'react'
import "../../styles.css"

  const socket = io.connect("http://localhost:3001")
 // const socket = io.connect("https://memorylane-app.herokuapp.com/")

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
    const [player, setPlayer] = useState(1)
    const [choice1, setChoice1] = useState("") //raised, lowered, DEAD
    const [choice2, setChoice2] = useState("") //raised, lowered, DEAD
    const [yourNumber, setYourNumber] = useState(null)
    const [attacker, setAttacker] = useState(true)
    const [lives1, setLives1] = useState(2)
    const [lives2, setLives2] = useState(2) 
    const [total, setTotal] = useState(4)
    const [locked, setLocked] = useState(false)

    const [thumb1A, setThumb1A] = useState("")
    const [thumb1B, setThumb1B] = useState("")
    const [thumb2A, setThumb2A] = useState("")
    const [thumb2B, setThumb2B] = useState("")
    const [log, setLog] = useState("")
    const [thumbsRaised, setThumbsRaised] = useState(null)
    const [resultNumber, setResultNumber] = useState(null)

    



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
        })

        socket.on("reset", () => {
            resetChoices()
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
        })


    }, [updateAttacker, resetChoices])
    

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
                    <button onClick={handleConfirm}>Confirm</button>
                </>
            )
        }
    }
    
    function BackButton() {
        return (
            <>
                <button onClick={handleBack}>Back</button>
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
                    <h5>Choose A Number</h5>
                    <br />
                    <p>Your Number: {yourNumber}</p>
                    <br />
                    <div className='options'>
                        <ul>
                            <li><ZeroButton /></li>
                            <li><OneButton /></li>
                            <li><TwoButton /></li>
                            <li><ThreeButton /></li>
                            <li><FourButton /></li>
                        </ul>
                    </div>
                </>
                
            )
        } else {
            return null
        }

    }

    function ZeroButton() {
        return (
            <button onClick={() => setYourNumber(0)}>0</button>
        )
    }

    function OneButton() {
        return (
            <button onClick={() => setYourNumber(1)}>1</button>
        )
    }

    function TwoButton() {
        return (
            <button onClick={() => setYourNumber(2)}>2</button>
        )
    }

    function ThreeButton() {
        if (total < 3) {
            return null
        } else {
            return (
                <button onClick={() => setYourNumber(3)}>3</button>
            )
        }
    }

    function FourButton() {
        if (total < 4) {
            return null
        } else {
            return (
                <button onClick={() => setYourNumber(4)}>4</button>
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
                    <button onClick={() => setChoice1("Raise")}>Raise</button>
                    <button onClick={() => setChoice1("Lower")}>Lower</button>
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
                    <button onClick={() => setChoice2("Raise")}>Raise</button>
                    <button onClick={() => setChoice2("Lower")}>Lower</button>
                </>
            )
        }
    }

    function ChooseSection() {
        return (
            <div>
                <ChooseRaise />
                <ChooseNumber />
                <div>
                        {locked ? null : <button onClick={() => submitChoices()}>Lock In</button>}
                        {locked ? null : <button onClick={() => resetChoices()}>Reset</button>}
                </div>
            </div>
        )
    }

    function ResultSection() {
        return (
            <div>
                {attacker ? "attacker":"not attacker"}
                <br />
                Player 1 Lives {player === 1 ? "(YOU)" : ""}: {lives1}
                <br />
                Player 2 Lives {player === 2 ? "(YOU)" : ""}: {lives2}
                <br />

                <div className='my-choices'>
                    <span>Player 1 Choice 1 {player === 1 ? "(YOU)" : ""}: {thumb1A}</span>
                    <span>Player 1 Choice 2 {player === 1 ? "(YOU)" : ""}: {thumb1B}</span>
                </div>

                <div className='my-choices'>
                    <span>Player 2 Choice 1 {player === 2 ? "(YOU)" : ""}: {thumb2A}</span>
                    <span>Player 2 Choice 2 {player === 2 ? "(YOU)" : ""}: {thumb2B}</span>
                </div>

                <div>Number of Thumbs Raised: {thumbsRaised}</div>
                <div>Number Called: {resultNumber}</div>

                <div>{log}</div>   
            </div>
        )
        
    }

    function Game() {
        if (!waiting && !error && confirmed) {
            return (
                <>
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