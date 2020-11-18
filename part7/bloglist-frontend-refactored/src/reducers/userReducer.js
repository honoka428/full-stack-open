const initialState = null

const userReducer = (state = initialState, action) => {
    switch(action.type){
        case 'UPDATE_USER':
            return action.data
        case 'GET_USER':
            return state
        default:
            return state
    }
}

export const updateUser = (user) => {
    return {
        type: 'UPDATE_USER',
        data: user //object
    }
}

export { userReducer }