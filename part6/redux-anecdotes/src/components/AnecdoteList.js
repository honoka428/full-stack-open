import React from 'react'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'


const AnecdoteList = (props) => {

  const vote = (id, content, votes) => {
      console.log('vote', id)
      props.addVote(id, content, votes)
      props.setNotification(`You voted for ${content}`, 5000)
  }
  
  return (
      <div>
      {props.anecdote
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

const mapStateToProps = (state) => {
  if (state.filter === 'ALL') {
    return { 
      anecdote: state.anecdote
    }
  }
  else {
    return {
      anecdote: state.anecdote.filter(a => a.content.toLowerCase().includes(state.filter.toLowerCase()))
    }
  }
}

const mapDispatchToProps = {
  addVote,
  setNotification
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)