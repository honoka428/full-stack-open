import { composeWithDevTools } from 'redux-devtools-extension'
import anecdoteReducer from './reducers/anecdoteReducer'
import { createStore, combineReducers } from 'redux'
import notificationReducer from './reducers/notificationReducer'

const reducer = combineReducers({
    anecdote: anecdoteReducer,
    notification: notificationReducer
})

const store = createStore(
    reducer,
    composeWithDevTools()
)

export default store