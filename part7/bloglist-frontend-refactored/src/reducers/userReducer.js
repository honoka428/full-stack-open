const userReducer = (state = null, action) => {
    switch(action.type){
        case 'SET_USER':
            return action.data
        case 'REMOVE_USER':
            return action.data
        default:
            return state
    }
}

export const setUser = () => {
    return async dispatch => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            const loggedUser = JSON.parse(loggedUserJSON)

            dispatch({
                type: 'SET_USER',
                data: loggedUser //object
            })
        console.log('dispatched user', loggedUser)
    }}
}

export const removeUser = () => {
    return async dispatch => {
        dispatch({
            type: 'REMOVE_USER',
            data: null
        })
    }
}

export { userReducer }