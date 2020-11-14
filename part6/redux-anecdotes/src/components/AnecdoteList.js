import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { updateNotification } from '../reducers/notificationReducer'


const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdote)
    const dispatch = useDispatch()

    const vote = (id, content) => {
        console.log('vote', id)
        dispatch(addVote(id))
        dispatch(updateNotification(content))
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
                  <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
                </div>
              </div>
        )}
        </div>
    )
}

export default AnecdoteList