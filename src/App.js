import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createAnecdote, vote } from './reducers/anecdoteReducer'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const addAnecdote = (event) => {
    event.preventDefault()
    const anecdoteContentElement = document.querySelector("input[name='anecdote']")
    const content = anecdoteContentElement.value
    anecdoteContentElement.value = ''
    dispatch(createAnecdote(content))
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
            <button onClick={() => dispatch(vote(anecdote.id))}>vote</button>
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