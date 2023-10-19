// initialState = { user: {} }
const userReducer = (state, action) => {
    switch(action.type) {
        case 'USER_LOGIN' : {
            return {...state, user: action.payload }
        }
        case 'LOGOUT_USER' : {
            return { ...state, user: {}, myPolls: [], myVotes: []}
        }
        case 'SET_MY_POLLS' : {
            return {...state, myPolls: action.payload }
        }
        case 'SET_MY_VOTES' : {
            return {...state, myVotes: action.payload }
        }
        case 'ADD_MY_POLL' : {
            return {...state, myPolls: [...state.myPolls, action.payload]}
        }
        case 'ADD_MY_VOTE' : {
            return {...state, myVotes: [...state.myVotes, action.payload ]}
        }
        default: {
            return {...state}
        }
    }
}

export default userReducer 