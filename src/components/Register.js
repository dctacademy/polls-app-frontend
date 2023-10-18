import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../config/axios'
function Register() {
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [serverErrors, setServerErrors] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault() 
        const formData = {
            username,
            email,
            password 
        }
        try {
            const response = await axios.post('/auth/register', formData)
            navigate('/login', { state: { message: response.data.message}})
        } catch(e) {
            setServerErrors(e.response.data.errors)
        }
    }

    return (
        <div>
            <h2>Register Component</h2> 
            { serverErrors.length > 0 && (
                <div>
                    <h3>These errors prohibitted the form from being saved: </h3>
                    <ul>
                    { serverErrors.map((ele, i) => {
                        return <li key={i}>{ ele.msg }</li>
                    })}
                    </ul> 
                </div> 
            )}
            <form onSubmit={handleSubmit}>
                <label>
                    Enter username <br />
                    <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
                </label> <br />
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

export default Register