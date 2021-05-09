import actionTypes from './actionTypes'
const initialState = {
    isLoading: true,
    isAuth: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SETLOADING: return {
            ...state,
            isLoading: action.isLoading
        }
        case actionTypes.SETAUTH: {
            return {
                ...state,
                isAuth: action.isAuth
            }
        }
        default: return {
            ...state
        }
    }
}

export default reducer;