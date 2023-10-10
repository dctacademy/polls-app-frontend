import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import _ from 'lodash'
import Home from './components/Home'
import Register from './components/Register'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import userReducer from './reducers/user-reducer'
import { useReducer, createContext } from 'react'


export const UserContext = createContext()

export function App(){ 
    const [state, dispatch] = useReducer(userReducer, { user: {}})
    const handleLogout = () => {
        localStorage.removeItem('token')
        dispatch({ type: 'LOGOUT_USER'})
    }
    return (
        <BrowserRouter>
            <UserContext.Provider value={{state, dispatch }}>
                <div>
                    <h1>Polling App</h1>
                    <nav>
                        <li><Link to="/">Home</Link></li>
                        { _.isEmpty(state.user) ? (
                            <>
                                <li><Link to="/register">Register</Link></li>
                                <li><Link to="/login">Login</Link></li>
                            </>
                        ) : (
                            <>
                                <li><Link to="/dashboard">dashboard</Link></li>
                                <li><Link to="#" onClick={handleLogout}>logout</Link></li>
                            </>
                        )}
                        
                    </nav>


                    <Routes>
                        <Route path="/" element={<Home />}/> 
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route path='/dashboard' element={<Dashboard />} />
                    </Routes>
                </div>
            </UserContext.Provider>
        </BrowserRouter>
    )
}
