import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'ADD_VOTE':
      const id = action.data.id
      const anecdoteToChange = state.find(a => a.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }

      return state.map(a => a.id === id ? changedAnecdote : a)

    case 'CREATE_ANECDOTE':
      return [...state, action.data]

    case 'INIT_ANECDOTES':
      return action.data

    default: // if none of the above matches, code comes here
    return state
  }
}

  // *** REACT Thunk *** middleware
  // makes async calls to backend possible within an action creator

export const initializeAnecdotes = () => {
  // Dispatch passed as param
  // API call to get all anecdotes then use the result to
    // dispatch to state
  return async(dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

// Update anecdotes state in frontend with object returned from backend
export const createAnecdote = (content) => {
  return async(dispatch) => {
    // Add new anecdote to db (obj created in backend)
    const data = await anecdoteService.createOne(content)
    dispatch({
      type: 'CREATE_ANECDOTE',
      data
    })
  }
}

export const addVote = (id, content, votes) => {
  return async(dispatch) => {
    const updatedAnecdote = {
      id: id,
      content: content,
      votes: votes + 1
    }
    const data = await anecdoteService.updateOne(updatedAnecdote)
    
    dispatch({
      type: 'ADD_VOTE',
      data
    })
  }
}

export default anecdoteReducer