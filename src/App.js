import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Register from './components/Register'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import NavBar from './components/NavBar'
import userReducer from './reducers/user-reducer'
import { useReducer, createContext } from 'react'
export const UserContext = createContext()

export function App(){ 
    const [state, dispatch] = useReducer(userReducer, { user: {}})
    
    return (
        <BrowserRouter>
            <UserContext.Provider value={{state, dispatch }}>
                <div>
                    <h1>Polling App</h1>
                    <NavBar /> 


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
