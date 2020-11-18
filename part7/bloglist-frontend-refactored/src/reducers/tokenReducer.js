const tokenReducer = (state = '', action) => {
    switch (action.type) {
        case 'UPDATE_TOKEN':
            return action.data
        case 'RESET_TOKEN':
            return state
        default:
            return state
    }
}

export const updateToken = (data) => {
    return {
        type: 'UPDATE_TOKEN',
        data: data
    }
}

export const resetToken = () => {
    return {
        type: 'RESET_TOKEN',
        data: ''
    }
}

export { tokenReducer }