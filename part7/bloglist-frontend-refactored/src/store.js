import { createStore, combineReducers } from 'redux'
// import thunk from 'redux-thunk'
// import { composeWithDevTools } from 'redux-devtools-extension'

import { blogReducer } from './reducers/blogReducer'
import { userReducer } from './reducers/userReducer'
import { notificationReducer } from './reducers/notificationReducer'
import { loginReducer } from './reducers/loginReducer'
import { tokenReducer } from './reducers/tokenReducer'

const reducer = combineReducers({
    blog: blogReducer,
    notification: notificationReducer,
    user: userReducer,
    login: loginReducer,
    token: tokenReducer
})
  
const store = createStore(
    reducer
)

export default store