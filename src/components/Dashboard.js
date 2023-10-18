import { useContext } from 'react'
import {UserContext} from '../App'
function Dashboard() {
    const { state } = useContext(UserContext)
    
    return (
        <div>
            <h2>Dashboard Component</h2>
            <p>Welcome, { state.user.username }!</p>
            <h2>Total Polls - { state.myPolls.length } </h2>
        </div>
    )
}

export default Dashboard