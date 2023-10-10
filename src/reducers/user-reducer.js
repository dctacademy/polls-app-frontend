// initialState = { user: {} }
const userReducer = (state, action) => {
    switch(action.type) {
        case 'USER_LOGIN' : {
            return {...state, user: action.payload }
        }
        case 'LOGOUT_USER' : {
            return { ...state, user: {}}
        }
        default: {
            return {...state}
        }
    }
}

export default userReducer 