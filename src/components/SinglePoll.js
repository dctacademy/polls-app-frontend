import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { PollsContext, UserContext } from '../App'
import { useContext, useState } from 'react'
import _ from 'lodash'
import axios from '../config/axios'
function SinglePoll(){ 
    const { id } = useParams() 
    const { userState, userDispatch } = useContext(UserContext)
    const { pollsState} = useContext(PollsContext) 
    const poll = pollsState.activePolls.find((ele) => {
        return ele._id === id 
    })

    const hasVoted = userState.myVotes.find((ele) => {
        return ele.poll === id
    })

    const [selectedOption, setSelectedOption] = useState(hasVoted ? hasVoted.option : '')
    const [serverErrors, setServerErrors] = useState([])

   

    const handleVote = async () => {
        try {
            const voteResponse = await axios.post(`/api/polls/vote/${id}`, {
                option: selectedOption
            }, { 
                headers: {
                    'Authorization' : localStorage.getItem('token')
                }
            })
            console.log(voteResponse.data)
            alert('thank you for voting')
            userDispatch({ type: 'ADD_MY_VOTE', payload: voteResponse.data })
        } catch(e) {
            setServerErrors(e.response.data.errors)
        }
    }

    // element variable 
    const displayButton = () => {
        if(_.isEmpty(userState.user)) {
            return <Link to="/login"><button>Login to vote</button></Link>
        } else {
            if(hasVoted) {
                return 'your vote is recorded'
            } else {
                return <button onClick={handleVote}>Vote</button>
            }
        }
    }

    return (
        <div>
            { poll && (
                <div>
                    <h2>{poll.question} <small> {poll.categoryId.name} </small></h2>
                    <h3>Options</h3>
                    {serverErrors.length > 0 && (
                        <div>
                            <h3>These errors prohibitted the form from being saved: </h3>
                            <ul>
                                {serverErrors.map((ele, i) => {
                                    return <li key={i}>{ele.msg}</li>
                                })}
                            </ul>
                        </div>
                    )}
                    <ul>
                        {poll.options.map((ele) => {
                            return <li key={ele._id}>
                                <input 
                                    type="radio" 
                                    disabled={_.isEmpty(userState.user)} 
                                    value={selectedOption} 
                                    name="poll" 
                                    id={ele._id}
                                    onChange={(e) => setSelectedOption(ele._id)}
                                    checked={ele._id === selectedOption}
                                />
                            
                                <label htmlFor={ele._id}>{ele.optionText} </label>
                                </li>
                        })}
                    </ul>

                    { displayButton() }
                    
                    
                    <p>created by {poll.creator.username} expiring on {new Date(poll.endDate).toDateString()} </p>
                </div> 
            )}
            
        </div> 
    )
}

export default SinglePoll