function pollsReducer(state, action) {
    switch(action.type) {
        case 'SET_ACTIVE_POLLS' : {
            return { ...state, activePolls: action.payload }
        }
        default: {
            return {...state}
        }
    }
}

export default pollsReducer