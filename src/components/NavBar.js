import { Link } from 'react-router-dom'
import _ from 'lodash'
import { useContext } from 'react' 
import { UserContext } from '../App'
function NavBar() {
    const { state, dispatch } = useContext(UserContext) 

    const handleLogout = () => {
        localStorage.removeItem('token')
        dispatch({ type: 'LOGOUT_USER' })
    }
    
    return (
        <nav>
            <li><Link to="/">Home</Link></li>
            {_.isEmpty(state.user) ? (
                <>
                    <li><Link to="/register">Register</Link></li>
                    <li><Link to="/login">Login</Link></li>
                </>
            ) : (
                <>
                    <li><Link to="/dashboard">dashboard</Link></li>
                    <li><Link to="/" onClick={handleLogout}>logout</Link></li>
                </>
            )}

        </nav>
    )
}

export default NavBar 