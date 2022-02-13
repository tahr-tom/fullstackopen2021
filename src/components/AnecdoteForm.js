import React from 'react';
import { connect } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';


const AnecdoteForm = ({createAnecdote, setNotification}) => {
  const addAnecdote = async (event) => {
    event.preventDefault()
    const anecdoteContentElement = document.querySelector("input[name='anecdote']")
    const content = anecdoteContentElement.value
    anecdoteContentElement.value = ''
    createAnecdote(content)
    setNotification(`you created ${content}`, 5)
  }

  return (
    <><h2>create new</h2><form>
      <div><input name='anecdote' /></div>
      <button onClick={addAnecdote}>create</button>
    </form></>);
}


const ConnectedAnecdoteForm = connect(null, {createAnecdote, setNotification})(AnecdoteForm)

export default ConnectedAnecdoteForm;