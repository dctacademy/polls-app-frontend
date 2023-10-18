import { useContext } from 'react'
import { UserContext } from '../App'
function MyPolls() {
    const { state } = useContext(UserContext)
    return (
        <div>
            <h2>My Polls </h2>
            <h2>Total Polls - { state.myPolls.length }</h2>
        </div>
    )
}

export default MyPolls