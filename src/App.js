import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch({
      type: 'VOTE',
      data: { id }
    })
  }

  const addAnecdote = (event) => {
    event.preventDefault()
    const anecdoteContentElement = document.querySelector("input[name='anecdote']")
    const content = anecdoteContentElement.value
    anecdoteContentElement.value = ''
    dispatch({
      type: 'NEW_ANECDOTE',
      data: {
        content: content,
        id: (100000 * Math.random()).toFixed(0),
        votes: 0
      }
    })
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
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
      <h2>create new</h2>
      <form>
        <div><input name='anecdote'/></div>
        <button onClick={addAnecdote}>create</button>
      </form>
    </div>
  )
}

export default App