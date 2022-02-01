import React from 'react';
import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';


const AnecdoteForm = () => {
  const dispatch = useDispatch()


  const addAnecdote = (event) => {
    event.preventDefault()
    const anecdoteContentElement = document.querySelector("input[name='anecdote']")
    const content = anecdoteContentElement.value
    anecdoteContentElement.value = ''
    dispatch(createAnecdote(content))
  }

  return (
    <><h2>create new</h2><form>
      <div><input name='anecdote' /></div>
      <button onClick={addAnecdote}>create</button>
    </form></>);
}
 


export default AnecdoteForm;