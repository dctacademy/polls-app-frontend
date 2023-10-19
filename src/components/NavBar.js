import { Link } from 'react-router-dom'
import _ from 'lodash'
import { useContext } from 'react' 
import { UserContext } from '../App'
function NavBar() {
    const { userState, userDispatch } = useContext(UserContext) 

    const handleLogout = () => {
        localStorage.removeItem('token')
        userDispatch({ type: 'LOGOUT_USER' })
        // userDispatch({ type: 'CLEAR_MY_POLLS'})
    }
    
    return (
        <nav>
            <li><Link to="/">Home</Link></li>
            {_.isEmpty(userState.user) ? (
                <>
                    <li><Link to="/register">Register</Link></li>
                    <li><Link to="/login">Login</Link></li>
                </>
            ) : (
                <>
                    <li><Link to="/dashboard">dashboard</Link></li>
                    <li><Link to="/polls/new" >Create Poll</Link></li>
                    <li><Link to="/polls/my-polls">My Polls</Link></li>
                    <li><Link to="/" onClick={handleLogout}>logout</Link></li>
                </>
            )}

        </nav>
    )
}

export default NavBar 