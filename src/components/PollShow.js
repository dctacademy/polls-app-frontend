import { useParams } from 'react-router-dom'
import { useContext } from 'react' 
import { UserContext } from '../App'
function PollShow() {
    const { id } = useParams()
    const { userState } = useContext(UserContext)
    const poll = userState.myPolls.find((ele) => {
        return ele._id === id
    })
    return (
        <div>
            <h2>{ poll.question }</h2>
            <h3>Options</h3>
            <ul>
                { poll.options.map((ele) => {
                    return <li key={ele._id} > { ele.optionText }</li>
                })}
            </ul>
        </div>
    )
}
export default PollShow