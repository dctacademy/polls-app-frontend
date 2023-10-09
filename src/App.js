import { BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import Home from './components/Home'
import Register from './components/Register'
import Login from './components/Login'

function App(){ 
    return (
        <BrowserRouter>
            <div>
                <h1>Polling App</h1>
                <nav>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/register">Register</Link></li>
                    <li><Link to="/login">Login</Link></li>
                </nav>


                <Routes>
                    <Route path="/" element={<Home />}/> 
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App 