import { useContext } from 'react'
import {UserContext} from '../App'
function Dashboard() {
    const { state } = useContext(UserContext)
    return (
        <div>
            <h2>Dashboard Component</h2>
            <p>Welcome, { state.user.username }!</p>
        </div>
    )
}

export default Dashboard