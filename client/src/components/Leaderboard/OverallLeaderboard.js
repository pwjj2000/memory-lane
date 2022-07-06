import { supabase } from "../../supabase";
import { useState, useEffect } from 'react'
import { useHistory, Link} from 'react-router-dom';

function OverallLeaderboard() {
    const [leaderboard, setLeaderboard] = useState(null)
    const [array, setArray] = useState(null)
    const [personal, setPersonal] = useState(null)

    const history = useHistory();

    useEffect(() => {
        const readLeaderboard = async () => {
            // Read the data
            let { data, error } = await supabase
              .from('leaderboard')
              .select('email, overall, id')
              .order('overall', {ascending: false})
          
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
                                <p>Your Rank</p>
                                <p>Your Email</p>
                                <p>Your Score (Overall)</p>
                            </div>
                            <ul className="leaderboard-list">
                                <li className='row'>
                                    <p className="rank">{i + 1}</p>
                                    <p className="email">{array[i].email}</p>
                                    <p className="score">{array[i].overall}</p>
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
                        <p className="score">{curr.overall}</p>
                    </li>
        )
    }

    return (
        <>
            <button onClick={() => history.push('/')} class="hidden-button">
                <img src="./back icon.png" class="backbutton" alt="Back"/>
            </button>
            <div className="nav-leaderboard">
                <ul className="nav-buttons">
                    <li className="nav-button">
                        <Link className="link" to='/overall-leaderboard'>Overall</Link>
                    </li>
                    <li className="nav-button">
                        <Link className="link" to='/zha-leaderboard'>Zha</Link>
                    </li>
                    <li className="nav-button">
                        <Link className="link" to='/chopsticks-leaderboard'>Chopsticks</Link>
                    </li>
                    <li className="nav-button">
                        <Link className="link" to='/thumbs-leaderboard'>Thumbs</Link>
                    </li>
                </ul>
            </div>
            {personal}
            <h2>Leaderboard (Overall)</h2>
            <section className="leaderboard">
                <div className="leaderboard-header">
                    <p>Rank</p>
                    <p>Email</p>
                    <p>Score (Overall)</p>
                </div>
                <ul className="leaderboard-list">{leaderboard}</ul>
            </section>
            
        </>
    )


}

export default OverallLeaderboard;