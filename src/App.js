import { BrowserRouter, Routes, Route } from 'react-router-dom'
import axios from './config/axios'
import Home from './components/Home'
import Register from './components/Register'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import NavBar from './components/NavBar'
import NewPoll from './components/NewPoll'
import MyPolls from './components/MyPolls'
import userReducer from './reducers/user-reducer'
import { useReducer, createContext, useEffect } from 'react'

export const UserContext = createContext()

export function App(){ 
    const [state, dispatch] = useReducer(userReducer, { user: {}, myPolls: []})


    useEffect(() => {
        if(localStorage.getItem('token')) { // handling page reload
            (async () => {
                try {
                    const response = await axios.get('/api/users/account', {
                        headers: {
                            'Authorization' : localStorage.getItem('token')
                        }
                    })
                    dispatch({ type: 'USER_LOGIN', payload: response.data })

                    const pollsResponse = await axios.get('/api/polls/mypolls', {
                        headers: {
                            'Authorization' : localStorage.getItem('token')
                        }
                    })
                    dispatch({ type: 'SET_MY_POLLS', payload: pollsResponse.data})
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
                        <Route path='/polls/my-polls' element={<MyPolls />} />
                    </Routes>
                </div>
            </UserContext.Provider>
        </BrowserRouter>
    )
}


/*
    poor | below average | average | above average | expentional 
*/