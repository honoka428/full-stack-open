import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'


const AnecdoteList = () => {
  const filter = useSelector(state => state.filter)

  const anecdotes = useSelector(state => {
      if (filter === 'ALL') { return state.anecdote }
      return state.anecdote.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
    })
  
  const dispatch = useDispatch()

  const vote = (id, content, votes) => {
      console.log('vote', id)
      dispatch(addVote(id, content, votes))
      dispatch(setNotification(`You voted for ${content}`, 5000))
  }
  
  return (
      <div>
      {anecdotes
          .sort((a, b) => a.votes - b.votes) // if a.votes - b.votes returns negative, sort a.votes first
          .map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote.id, anecdote.content, anecdote.votes)}>vote</button>
              </div>
            </div>
      )}
      </div>
  )
}

export default AnecdoteList