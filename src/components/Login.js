import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'
function Login() {
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
            const response = await axios.post('http://localhost:3090/auth/login', formData) 
            localStorage.setItem('token', response.data.token)
            navigate('/')
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
        </div>
    )
}

export default Login