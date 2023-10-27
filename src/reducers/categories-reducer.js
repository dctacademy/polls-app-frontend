export default function categoriesReducer(state, action) {
    switch(action.type){
        case 'SET_CATEGORIES' : {
            return {...state, data: action.payload}
        }
        default: {
            return {...state}
        }
    }
}