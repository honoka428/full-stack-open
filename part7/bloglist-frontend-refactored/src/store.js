import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { blogReducer } from './reducers/blogReducer'
import { userReducer } from './reducers/userReducer'
import { notificationReducer } from './reducers/notificationReducer'
import { loginReducer } from './reducers/loginReducer'
import { allUsersReducer } from './reducers/allUsersReducer'
import { commentReducer } from './reducers/commentReducer'

const reducer = combineReducers({
    blog: blogReducer,
    notification: notificationReducer,
    user: userReducer,
    login: loginReducer,
    allUsers: allUsersReducer,
    comment: commentReducer
})
  
const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
)

export default store