import { BrowserRouter, Routes, Route } from 'react-router-dom'
import axios from 'axios'
import Home from './components/Home'
import Register from './components/Register'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import NavBar from './components/NavBar'
import NewPoll from './components/NewPoll'
import userReducer from './reducers/user-reducer'
import { useReducer, createContext, useEffect } from 'react'

export const UserContext = createContext()

export function App(){ 
    const [state, dispatch] = useReducer(userReducer, { user: {}})

    useEffect(() => {
        if(localStorage.getItem('token')) {
            (async () => {
                try {
                    const response = await axios.get('http://localhost:3090/api/users/account', {
                        headers: {
                            'Authorization' : localStorage.getItem('token')
                        }
                    })
                    dispatch({ type: 'USER_LOGIN', payload: response.data })
                } catch(e){
                    alert(e.message)
                }
            })()
        }
    }, [])
    
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
                        <Route path="/polls/new" element={<NewPoll />} />
                    </Routes>
                </div>
            </UserContext.Provider>
        </BrowserRouter>
    )
}


/*
    poor | below average | average | above average | expentional 
*/