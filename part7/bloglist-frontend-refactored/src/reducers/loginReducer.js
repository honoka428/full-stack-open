const initialState = {
    username: '',
    password: ''
}

const loginReducer = (state = initialState, action) => {
    switch(action.type){
        case 'INIT_LOGIN':
            return state
        case 'UPDATE_USERNAME':
            state.username = action.data
            return state
        case 'UPDATE_PASSWORD':
            state.password = action.data
            return state
        default:
            return state
    }
}

export const initializeLoginForm = () => {
    return {
        type: 'INIT_LOGIN',
        data: ''
    }
}

export const updateUsername = (text) => {
    return {
        type: 'UPDATE_USERNAME',
        data: text
    }
}

export const updatePassword = (text) => {
    return {
        type: 'UPDATE_PASSWORD',
        data: text
    }
}

export { loginReducer }