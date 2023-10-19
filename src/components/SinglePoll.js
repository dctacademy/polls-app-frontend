import { useParams } from 'react-router-dom'
import { PollsContext } from '../App'
import { useContext } from 'react'
function SinglePoll(){ 
    const { id } = useParams() 
    const { pollsState} = useContext(PollsContext) 
    const poll = pollsState.activePolls.find((ele) => {
        return ele._id === id 
    })
    
    return (
        <div>
            { poll && (
                <div>
                    <h2>{poll.question} <small> {poll.categoryId.name} </small></h2>
                    <h3>Options</h3>
                    <ul>
                        {poll.options.map((ele) => {
                            return <li key={ele._id}>
                                <input type="radio" value={ele._id} name="poll" />
                                {ele.optionText} </li>
                        })}
                    </ul>
                    <p>created by {poll.creator.username} expiring on {new Date(poll.endDate).toDateString()} </p>
                </div> 
            )}
            
        </div> 
    )
}

export default SinglePoll