import { useLocation, useHistory } from 'react-router-dom'
import {io} from 'socket.io-client'
import {useEffect, useState} from 'react'
import "../../styles.css"

 const socket = io.connect("http://localhost:3001")
 //const socket = io.connect("https://memorylane-app.herokuapp.com/")

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
    const [choice1, setChoice1] = useState("")
    const [choice2, setChoice2] = useState("")
    const [player, setPlayer] = useState(1)
    const [attacker, setAttacker] = useState(true)
    const [lives1, setLives1] = useState(2)
    const [lives2, setLives2] = useState(2) 
    const [locked, setLocked] = useState(false)

    const [chosen1A, setChosen1A] = useState("")
    const [chosen1B, setChosen1B] = useState("")
    const [chosen2A, setChosen2A] = useState("")
    const [chosen2B, setChosen2B] = useState("")
    const [result1, setResult1] = useState("")
    const [result2, setResult2] = useState("")
    const [result3, setResult3] = useState("")
    const [result4, setResult4] = useState("")

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
        })

        socket.on("reset-choices", () => {
            resetChoices()
        })

        // socket.on("change-lives", (data) => {
        //     setLives(data.newLives)
        // })

        socket.on("zha-end", (data) => {
            const loser = data.player
            const winner = loser === 1 ? 2 : 1
            const winMessage = "Player " + loser + " ran out of lives. Player " + winner + " wins. Returning to Create/Join Room..."
            setReceived(winMessage)

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

    function Game() {
        if (!waiting && !error && confirmed) {
            return (
                <>
                    <div className='zha-game'>
                        <button onClick={() => choose("Plane")}>
                            <img src='' alt='Plane' />
                        </button>
    
                        <button onClick={() => choose("Human")}>
                            <img src='' alt='Human' />
                        </button>
    
                        <button onClick={() => choose("Bomb")}>
                            <img src='' alt='Bomb' />
                        </button>
                    </div>
                
                    <br/>
    
                    <div className='my-choices'>
                        <span>Your Choice 1: {choice1}</span>
                        <span>Your Choice 2: {choice2}</span>
                    </div>
    
                    <br/>
                    {attacker ? "attacker":"not attacker"}

                    <br />
                    Player 1 Lives {player === 1 ? "(YOU)" : ""}: {lives1}
                    <br />
                    Player 2 Lives {player === 2 ? "(YOU)" : ""}: {lives2}
                    <br />

                    <div className='my-choices'>
                        <span>Player 1 Choice 1 {player === 1 ? "(YOU)" : ""}: {chosen1A}</span>
                        <span>Player 1 Choice 2 {player === 1 ? "(YOU)" : ""}: {chosen1B}</span>
                    </div>

                    <div className='my-choices'>
                        <span>Player 2 Choice 1 {player === 2 ? "(YOU)" : ""}: {chosen2A}</span>
                        <span>Player 2 Choice 2 {player === 2 ? "(YOU)" : ""}: {chosen2B}</span>
                    </div>

                    {result1}
                    <br />
                    {result2}
                    <br />
                    {result3}
                    <br />
                    {result4}
                    <div>
                        {locked ? null : <button onClick={() => submitChoices()}>Lock In</button>}
                        {locked ? null : <button onClick={() => resetChoices()}>Reset</button>}
                    </div>
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