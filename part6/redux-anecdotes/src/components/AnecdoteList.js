import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'


const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdote)
    const dispatch = useDispatch()

    const vote = (id) => {
        console.log('vote', id)
        dispatch(addVote(id))
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
                  <button onClick={() => vote(anecdote.id)}>vote</button>
                </div>
              </div>
        )}
        </div>
    )
}

export default AnecdoteList