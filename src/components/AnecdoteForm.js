import React from 'react';
import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { remove, set } from '../reducers/notificationReducer';


const AnecdoteForm = () => {
  const dispatch = useDispatch()


  const addAnecdote = async (event) => {
    event.preventDefault()
    const anecdoteContentElement = document.querySelector("input[name='anecdote']")
    const content = anecdoteContentElement.value
    anecdoteContentElement.value = ''
    dispatch(createAnecdote(content))
    dispatch(set(`you created ${content}`))
    setTimeout(() => {
      dispatch(remove())
    }, 5000)
  }

  return (
    <><h2>create new</h2><form>
      <div><input name='anecdote' /></div>
      <button onClick={addAnecdote}>create</button>
    </form></>);
}
 


export default AnecdoteForm;