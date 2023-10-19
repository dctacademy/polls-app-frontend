import { useLocation, useNavigate, Link } from 'react-router-dom'
import axios from '../config/axios'
import { UserContext } from '../App'
import { useState, useContext } from 'react'
function Login() {
    const {userDispatch} = useContext(UserContext)
    const location = useLocation() 
    const navigate = useNavigate()
    // const message = location.state ? location.state.message : ''
    const message = location.state?.message 
    // const message = location.state.message
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('') 
    const [serverErrors, setServerErrors] = useState([])
    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = {
            email,
            password
        }
        try {
            
            const response = await axios.post('/auth/login', formData) 
            localStorage.setItem('token', response.data.token)
            const accountResponse = await axios.get('/api/users/account', {
                headers: {
                    'Authorization' : localStorage.getItem('token')
                }
            })
            const user = accountResponse.data 
            userDispatch({ type: 'USER_LOGIN', payload: user })

            const pollsResponse = await axios.get('/api/polls/mypolls', {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            })
            userDispatch({ type: 'SET_MY_POLLS', payload: pollsResponse.data })
            navigate('/dashboard')
        } catch(e) {
            setServerErrors(e.response.data.errors)
        }
    }

    return (
        <div>
            { message && <b> { message } </b>}
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
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
                <label>
                    Enter email <br />
                    <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
                </label> <br />
                <label>
                    Enter password <br />
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                </label> <br />
                <input type="submit" />
            </form>
            <b>New User? <Link to="/register">Sign up for free</Link></b>
        </div>
    )
}

export default Login