import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../App'
function MyPolls(props) {
    const { state } = useContext(UserContext)
    return (
        <div>
            <h2>My Polls </h2>
            <h2>Total Polls - { state.myPolls.length }</h2>
            <ul>
                { state.myPolls.map((ele) => {
                    return <li key={ele._id}><Link to={`/mypolls/${ele._id}`}>{ele.question}</Link></li>
                })}
            </ul>
        </div>
    )
}

export default MyPolls