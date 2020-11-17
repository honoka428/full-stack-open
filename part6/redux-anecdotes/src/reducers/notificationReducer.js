const getId = () => (100000 * Math.random()).toFixed(0)

const initialState = [{
  content: '',
  id: getId()
}]
  
const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TURN_ON_NOTIFICATION':
      state = [{
        content: action.data,
        id: getId()
      }]
      return state

    case 'TURN_OFF_NOTIFICATION':
      return initialState

    default:
      return state
  }
}

export const setNotification = (content, time) => {
    var timeoutId

    return async(dispatch) => {
      dispatch({
        type: 'TURN_ON_NOTIFICATION',
        data: content
      })

      clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
        dispatch({
          type: 'TURN_OFF_NOTIFICATION',
          data: ''
        })
      }, time)
    }
}

export default notificationReducer