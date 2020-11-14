const getId = () => (100000 * Math.random()).toFixed(0)

const initialState = [{
  content: '',
  id: getId()
}]
  
const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TURN_ON_NOTIFICATION':
      const newNotification = `You added a vote to '${action.data.content}'`
      state = [{
        content: newNotification,
        id: getId()
      }]
      return state

    case 'TURN_OFF_NOTIFICATION':
      return initialState

    default:
      return state
  }
}

export const turnOnNotification = (content) => {
    return {
        type: 'TURN_ON_NOTIFICATION',
        data: { content }
    }
}

export const turnOffNotification = () => {
  return {
      type: 'TURN_OFF_NOTIFICATION'
  }
}

export default notificationReducer