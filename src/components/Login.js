import { useLocation } from 'react-router-dom'
function Login() {
    const location = useLocation() 
    // const message = location.state ? location.state.message : ''
    const message = location.state?.message 
    // const message = location.state.message
    return (
        <div>
            { message && <b> { message } </b>}
            <h2>Login Component</h2>
        </div>
    )
}

export default Login