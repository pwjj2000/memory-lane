import { useLocation, useHistory } from 'react-router-dom'
import {io} from 'socket.io-client'
import {useEffect, useState} from 'react'
import "../../styles.css"
import { supabase } from '../../supabase'

const socket = io.connect("http://localhost:3001")
//const socket = io.connect("https://memorylane-app.herokuapp.com/")

function ChopsticksGame() {
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
    const [attacker, setAttacker] = useState(true)
    const [left1, setLeft1] = useState(1) //Left Hand
    const [right1, setRight1] = useState(1) //Right Hand
    const [left2, setLeft2] = useState(1)
    const [right2, setRight2] = useState(1)
    const [end, setEnd] = useState(false)

    const[showLR, setShowLR] = useState(true)
    const[showRL, setShowRL] = useState(true)
    const[showLEL, setShowLEL] = useState(true)
    const[showLER, setShowLER] = useState(true)
    const[showREL, setShowREL] = useState(true)
    const[showRER, setShowRER] = useState(true)
    const[showSplit, setShowSplit] = useState(false)

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
                history.push('chopsticks-new-game')
            }, 5000)
            
        })

        socket.on("player-2-disconnected", () => {
            reset()
        })

        socket.on("cs-receive", (data) => {
            // updateAttacker()
            setLeft1(data.L1)
            setRight1(data.R1)
            setLeft2(data.L2)
            setRight2(data.R2)
            updateAttacker()
            if (player === 1) {
                if (data.L1 !== 0) {
                    setShowLEL(true)
                    setShowLER(true)
                    setShowLR(true)
                }
                if (data.R1 !== 0) {
                    setShowREL(true)
                    setShowRER(true)
                    setShowRL(true)
                }
                if (data.L2 !== 0) {
                    setShowLEL(true)
                    setShowREL(true)
                }
                if (data.R2 !== 0) {
                    setShowLER(true)
                    setShowRER(true)
                }
                if (data.L2 === 0) {
                    setShowLEL(false)
                    setShowREL(false)
                }
                if (data.R2 === 0) {
                    setShowLER(false)
                    setShowRER(false)
                }
                if (data.L1 === 0) {
                    setShowLEL(false)
                    setShowLER(false)
                    setShowLR(false)
                    setShowRL(false)
                }
                if (data.R1 === 0) {
                    setShowREL(false)
                    setShowRER(false)
                    setShowRL(false)
                    setShowLR(false)
                }
                if (Math.abs(data.L1 - data.R1) > 1) {
                    setShowSplit(true)
                }
                if (Math.abs(data.L1 - data.R1) <= 1) {
                    setShowSplit(false)
                }
            } else {
                if (data.L2 !== 0) {
                    setShowLEL(true)
                    setShowLER(true)
                    setShowLR(true)
                }
                if (data.R2 !== 0) {
                    setShowREL(true)
                    setShowRER(true)
                    setShowRL(true)
                }
                if (data.L1 !== 0) {
                    setShowLEL(true)
                    setShowREL(true)
                }
                if (data.R1 !== 0) {
                    setShowLER(true)
                    setShowRER(true)
                }
                if (data.L2 === 0) {
                    setShowLEL(false)
                    setShowLER(false)
                    setShowLR(false)
                    setShowRL(false)
                }
                if (data.R2 === 0) {
                    setShowREL(false)
                    setShowRER(false)
                    setShowRL(false)
                    setShowLR(false)
                }
                if (data.L1 === 0) {
                    setShowLEL(false)
                    setShowREL(false)
                }
                if (data.R1 === 0) {
                    setShowLER(false)
                    setShowRER(false)
                }
                if (Math.abs(data.L2 - data.R2) > 1) {
                    setShowSplit(true)
                }
                if (Math.abs(data.L2 - data.R2) <= 1) {
                    setShowSplit(false)
                }
            }
        })

        socket.on("cs-end", (data) => {
            setAttacker(false)
            const winner = data.player
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
        })

        return () => {
            socket.removeAllListeners();
        };

    }, [updateAttacker, left1, left2, right1, right2, player, showLEL, showLER, showLR, showREL, showRER, showRL, showSplit, received, end])
    
    async function getScore() {
        const { data } = await supabase
            .from('leaderboard')
            .select()
            .eq('id', supabase.auth.user().id)
        setOverall(data[0].overall)
        setScore(data[0].chopsticks)
    }

    async function updateScore() {
        const { data, error } = await supabase
            .from('leaderboard')
            .update({ overall: overall + 1 })
            .eq('id', supabase.auth.user().id) //update overall score
        const { data1, error1 } = await supabase
            .from('leaderboard')
            .update({ chopsticks: score + 1 })
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
        history.push('/chopsticks-new-game')
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

    function LELButton() {
        if (showLEL) {
            return (
                <button onClick={() => LEL()} class="hidden-button">
                    <img src="./LEL.png"/>
                </button>
            )
        } else {
            return null
        }
    }

    function LERButton() {
        if (showLER) {
            return (
                <button onClick={() => LER()} class="hidden-button">
                    <img src="./LER.png" class="cs-LER"/>
                </button>
            )
        } else {
            return null
        }
    }

    function LRButton() {
        if (showLR) {
            return (
                <button onClick={() => LR()} class="hidden-button">
                    <img src="./LR.png" class="cs-LR"/>
                </button>
            )
        } else {
            return null
        }
    }

    function RELButton() {
        if (showREL) {
            return (
                <button onClick={() => REL()} class="hidden-button">
                    <img src="./LEL.png"/>
                </button>
            )
        } else {
            return null
        }
    }

    function RERButton() {
        if (showRER) {
            return (
                <button onClick={() => RER()} class="hidden-button">
                    <img src="./LER.png" class="cs-LER"/>
                </button>
            )
        } else {
            return null
        }
    }

    function RLButton() {
        if (showRL) {
            return (
                <button onClick={() => RL()} class="hidden-button">
                    <img src="./RL.png" class="cs-LR" />
                </button>
            )
        } else {
            return null
        }
    }

    function SplitButton() {
        if (showSplit) {
            return (
                <button onClick={() => Split()} class="hidden-button">
                    <img src="./split.png" />
                </button>
            )
        } else {
            return null
        }
    }

    function Options() {
        if (attacker) {
            return (
                <div>
                    <h3>Choose an option:</h3>
                    <div className='cs-options'>
                        <div class="cs-left">
                        <h4>Using your left:</h4>
                        <ul>
                            <li><LELButton/></li>
                            <li><LERButton/></li>
                            <li><LRButton/></li>
                        </ul>
                        </div>
                        <br/>
                        <div class="cs-right">
                        <h4>Using your right:</h4>
                        <ul>
                            <li><RELButton/></li>
                            <li><RERButton/></li>
                            <li><RLButton/></li>
                        </ul>
                        </div>
                        <br/>
                        <div class="cs-both">
                        <h4>Using both:</h4>
                        <ul>
                            <li><SplitButton/></li>
                        </ul>
                        </div>
                    </div>
                    <br/>
                </div>
            )
        } else {
            return null
        }
    }

    function Game() {
        if (!waiting && !error && confirmed && !end) {
            return (
                <>
                <h4>Welcome,{player === 1 ? "Player 1" : "Player 2"}</h4>
                    {attacker ? <img src="./attacking.png"/> : <img src="./defending.png" />}
                    <br/>
                    {attacker ?  "" : "Waiting for your opponent to make their move..."} 
                    
                    <br/>

                    <div className='cs-gameboard'>
                        <h3>Gameboard:</h3>
                        <div className='your-chopsticks'>
                            <span class="cs-box-border">{player === 1 ? <b>you:  </b> : <b>opponent:  </b>}</span>
                            <span> {left1 === 0 ? <img src="./defeated icon.png" class="cs-icon"/> 
                            : left1 === 1 ? <img src="./one finger.png" class="cs-icon"/>
                            : left1 === 2 ? <img src="./two finger.png" class="cs-icon"/>
                            : left1 === 3 ? <img src="./three finger.png" class="cs-icon"/>
                            : <img src="./four finger.png" class="cs-icon"/>}
                            </span>
                            <span> {right1 === 0 ? <img src="./defeated icon.png" class="cs-icon"/> 
                            : right1 === 1 ? <img src="./one finger.png" class="cs-icon"/>
                            : right1 === 2 ? <img src="./two finger.png" class="cs-icon"/>
                            : right1 === 3 ? <img src="./three finger.png" class="cs-icon"/>
                            : <img src="./four finger.png" class="cs-icon"/>}
                            </span>
                            <br/>
                        </div>
                        <div className='enemy-chopsticks'>
                            <span> {player === 2 ? <b>you: </b> : <b>opponent:</b>}</span>
                            <span>{left2 === 0 ? <img src="./defeated icon.png" class="cs-icon"/> 
                            : left2 === 1 ? <img src="./one finger.png" class="cs-icon"/>
                            : left2 === 2 ? <img src="./two finger.png" class="cs-icon"/>
                            : left2 === 3 ? <img src="./three finger.png" class="cs-icon"/>
                            : <img src="./four finger.png" class="cs-icon"/>}
                            </span>
                            <span> {right2 === 0 ? <img src="./defeated icon.png" class="cs-icon"/> 
                            : right2 === 1 ? <img src="./one finger.png" class="cs-icon"/>
                            : right2 === 2 ? <img src="./two finger.png" class="cs-icon"/>
                            : right2 === 3 ? <img src="./three finger.png" class="cs-icon"/>
                            : <img src="./four finger.png" class="cs-icon"/>}</span>
                        </div>
                    </div>
                      
                    <Options />
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
        setPlayer(1)
        setAttacker(true)
    }

    function updateAttacker() {
        if (attacker) {
            setAttacker(false)
        } else {
            setAttacker(true)
        }
    }

    function LR() {//R1 or R2 changes
        const L1 = left1
        const L2 = left2
        if (player === 1) {
            const R2 = right2
            const newRight = left1 + right1
            if (newRight < 5) {
                const R1 = newRight
                socket.emit("cs-submit", {L1, R1, L2, R2, room, player})
            } else {
                const R1 = 0
                socket.emit("cs-submit", {L1, R1, L2, R2, room, player})
            }
        } else {
            const R1 = right1
            const newRight = left2 + right2
            if (newRight < 5) {
                const R2 = newRight
                socket.emit("cs-submit", {L1, R1, L2, R2, room, player})
            } else {
                const R2 = 0
                socket.emit("cs-submit", {L1, R1, L2, R2, room, player})
            }
        }
    }

    function RL() {//L1 or L2 changes
        const R1 = right1
        const R2 = right2
        if (player === 1) {
            const L2 = left2
            const newLeft = left1 + right1
            if (newLeft < 5) {
                const L1 = newLeft
                socket.emit("cs-submit", {L1, R1, L2, R2, room, player})
            } else {
                const L1 = 0
                socket.emit("cs-submit", {L1, R1, L2, R2, room, player})
            }
        } else {
            const L1 = left1
            const newLeft = left2 + right2
            if (newLeft < 5) {
                const L2 = newLeft
                socket.emit("cs-submit", {L1, R1, L2, R2, room, player})
            } else {
                const L2 = 0
                socket.emit("cs-submit", {L1, R1, L2, R2, room, player})
            }
        }
    }

    function LEL() {//L1 or L2 changes
        const R1 = right1
        const R2 = right2
        const newEnemyLeft = left1 + left2
        if (player === 1) {
            const L1 = left1
            if (newEnemyLeft < 5) {
                const L2 = newEnemyLeft
                socket.emit("cs-submit", {L1, R1, L2, R2, room, player})
            } else {
                const L2 = 0
                socket.emit("cs-submit", {L1, R1, L2, R2, room, player})
            }
        } else {
            const L2 = left2
            if (newEnemyLeft < 5) {
                const L1 = newEnemyLeft
                socket.emit("cs-submit", {L1, R1, L2, R2, room, player})
            } else {
                const L1 = 0
                socket.emit("cs-submit", {L1, R1, L2, R2, room, player})
            }
        }
    }

    function LER() {//R1 or R2 changes
        const L1 = left1
        const L2 = left2
        if (player === 1) {//L1R2
            const R1 = right1
            const newEnemyRight = left1 + right2
            if (newEnemyRight < 5) {
                const R2 = newEnemyRight
                socket.emit("cs-submit", {L1, R1, L2, R2, room, player})
            } else {
                const R2 = 0
                socket.emit("cs-submit", {L1, R1, L2, R2, room, player})
            }
        } else {
            const R2 = right2
            const newEnemyRight = left2 + right1
            if (newEnemyRight < 5) {
                const R1 = newEnemyRight
                socket.emit("cs-submit", {L1, R1, L2, R2, room, player})
            } else {
                const R1 = 0
                socket.emit("cs-submit", {L1, R1, L2, R2, room, player})
            }
        }
    }

    function REL() {//R1L2 or R2L1
        const R1 = right1
        const R2 = right2
        if (player === 1) {
            const L1 = left1
            const newEnemyLeft = right1 + left2
            if (newEnemyLeft < 5) {
                const L2 = newEnemyLeft
                socket.emit("cs-submit", {L1, R1, L2, R2, room, player})
            } else {
                const L2 = 0
                socket.emit("cs-submit", {L1, R1, L2, R2, room, player})
            }
        } else {
            const L2 = left2
            const newEnemyLeft = right2 + left1
            if (newEnemyLeft < 5) {
                const L1 = newEnemyLeft
                socket.emit("cs-submit", {L1, R1, L2, R2, room, player})
            } else {
                const L1 = 0
                socket.emit("cs-submit", {L1, R1, L2, R2, room, player})
            }
        }
    }

    function RER() {
        const L1 = left1
        const L2 = left2
        const newEnemyRight = right1 + right2
        if (player === 1) {
            const R1 = right1
            if (newEnemyRight < 5) {
                const R2 = newEnemyRight
                socket.emit("cs-submit", {L1, R1, L2, R2, room, player})
            } else {
                const R2 = 0
                socket.emit("cs-submit", {L1, R1, L2, R2, room, player})
            }
        } else {
            const R2 = right2
            if (newEnemyRight < 5) {
                const R1 = newEnemyRight
                socket.emit("cs-submit", {L1, R1, L2, R2, room, player})
            } else {
                const R1 = 0
                socket.emit("cs-submit", {L1, R1, L2, R2, room, player})
            }
        }
    }

    function Split() {
        if (player === 1) {
            const total = left1 + right1
            const L1 = Math.floor(total / 2)
            const R1 = total - L1
            const L2 = left2
            const R2 = right2
            socket.emit("cs-submit", {L1, R1, L2, R2, room, player})
        } else {
            const total = left2 + right2
            const L2 = Math.floor(total / 2)
            const R2 = total - L2
            const L1 = left1
            const R1 = right1
            socket.emit("cs-submit", {L1, R1, L2, R2, room, player})
        }
    }

    return (
        <>
            {supabase.auth.user().id}
            <br />
            Player: {player}
            <br />
            Overall: {overall}
            <br />
            Score: {score}
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

export default ChopsticksGame