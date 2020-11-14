const notificationsAtStart = [
    'this is a test notification'
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
    return state
}

// export const addVote = (id) => {
//     return {
//         type: 'ADD_VOTE',
//         data: { id }
//     }
// }

export default notificationReducer