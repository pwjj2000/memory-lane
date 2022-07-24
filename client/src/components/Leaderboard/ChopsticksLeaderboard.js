import { supabase } from "../../supabase";
import { useState, useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom';

function ChopsticksLeaderboard() {
    const [leaderboard, setLeaderboard] = useState(null)
    const [array, setArray] = useState(null)
    const [personal, setPersonal] = useState(null)

    const history = useHistory();

    useEffect(() => {
        const readLeaderboard = async () => {
            // Read the data
            let { data, error } = await supabase
              .from('leaderboard')
              .select('email, chopsticks, id')
              .order('chopsticks', {ascending: false})
          
            if (error) {
              console.error(error)
              return
            }
          
            console.log(data)
            setArray(data)
            setLeaderboard(data.map(rowToDOM))
            setPersonal(yourRank())
        }

        function yourRank() {
            for (let i = 0; i < array.length; i++) {
                if (array[i].id === supabase.auth.user().id) {
                    return (
                        <section className="leaderboard">
                            <div className="leaderboard-header">
                            <p><img src="./rank.png" alt="Rank"/></p>
                            <p><img src="./email.png" alt="Email"/></p>
                            <p><img src="./score.png" alt="Score"/></p>
                            </div>
                            <ul className="leaderboard-list">
                                <li className='row'>
                                    <p className="rank">{i + 1}</p>
                                    <p className="email">{array[i].email}</p>
                                    <p className="score">{array[i].chopsticks}</p>
                                </li>
                            </ul>
                        </section>
                    )
                }
            }
        }

        const mySubscription = supabase
        .from('leaderboard')
        .on('*', payload => {
            console.log('Change received!', payload)
        })
        .subscribe()

        readLeaderboard()
    }, [array])


    
    function rowToDOM(curr, index) {
        return (
                    <li className='row'>
                        <p className="rank">{index + 1}</p>
                        <p className="email">{curr.email}</p>
                        <p className="score">{curr.chopsticks}</p>
                    </li>
        )
    }
    
    return (
        <div title="ChopsticksLeaderboard">
            <button onClick={() => history.push('/chopsticks')} className="hidden-button">
                <img src="./back icon.png" className="backbutton" alt="Back"/>
            </button>
            <div className="nav-leaderboard">
            <ul className="nav-buttons">
                <li className="nav-button">
                    <Link className="link" to='/overall-leaderboard'>
                        <img src="./overall logo.png" className="leaderboard-overall-button" alt="Overall Leaderboard"/>
                    </Link>
                </li>
                <li className="nav-button">
                    <Link className="link" to='/zha-leaderboard'>
                        <img src="./zha logo.png" className="leaderboard-zha-button" alt="Zha Leaderboard"/>
                    </Link>
                </li>
                <li className="nav-button">
                    <Link className="link" to='/chopsticks-leaderboard'>
                        <img src="./Chopsticks logo.png" className="leaderboard-zha-button" alt="Chopsticks Leaderboard"/>
                    </Link>
                </li>
                <li className="nav-button">
                    <Link className="link" to='/thumbs-leaderboard'>
                        <img src="./thumbs logo.png" className="leaderboard-zha-button" alt="Thumbs Leaderboard"/>
                    </Link>
                </li>
                </ul>
            </div>
            <br/>
            <div>
                 <img src="./Chopsticks logo.png" className="leaderboard-game-logo" alt="Chopsticks Logo"/>
                <h2>Chopsticks Leaderboard</h2>
                

            </div>
            <br/>
            <h3>Your ranking:</h3>
            <div className="leaderboard-your-ranking">
            {personal}
            </div><br/>
            <h3>Leaderboard:</h3>
            <div className="leaderboard-your-ranking">
            <section className="leaderboard">
                <div className="leaderboard-header">
                    <p><img src="./rank.png" alt="Rank"/></p>
                    <p><img src="./email.png" alt="Email"/></p>
                    <p><img src="./score.png" alt="Score"/></p>
                </div>
                <ul className="leaderboard-list">{leaderboard}</ul>
            </section>
            </div>
            
        </div>
    )


}

export default ChopsticksLeaderboard;