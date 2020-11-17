import React from 'react'
import { connect, useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () =>  {
    const dispatch = useDispatch()

    const addAnecdote = async(event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        
        // Add new anecdote to db (obj created in backend)
        const newAnecdote = await anecdoteService.createOne(content)

        // Update anecdotes state in frontend with object returned from backend
        dispatch(createAnecdote(newAnecdote))
    }

    return(
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div><input name='anecdote'/></div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}


export default AnecdoteForm