const notificationsAtStart = [
    'default notification'
  ]
  
const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (notification) => {
  return {
    content: notification,
    id: getId()
  }
}

const initialState = notificationsAtStart.map(asObject)
  
const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_NOTIFICATION':
      const newNotification = [`You added a vote to '${action.data.content}'`]

      return newNotification.map(asObject)

    default:
      return state
  }
}

export const updateNotification = (content) => {
    return {
        type: 'UPDATE_NOTIFICATION',
        data: { content }
    }
}

export default notificationReducer