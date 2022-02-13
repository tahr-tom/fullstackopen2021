import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { vote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const Anecdote = ({anecdote, handleClick}) => {
  return ( <div key={anecdote.id}>
    <div>
      {anecdote.content}
    </div>
    <div>
      has {anecdote.votes}
      <button onClick={handleClick}>vote</button>
    </div>
  </div> );
}
 

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    if(filter === '') {
      return anecdotes
    }
    return anecdotes.filter(anecdote => anecdote.content.includes(filter))
  })
  const dispatch = useDispatch()
  const handleClick = (anecdote) => {
    dispatch(vote(anecdote))
    dispatch(setNotification(`you voted ${anecdote.content}`, 5))
  }

  return anecdotes.map(anecdote =>
      <Anecdote key={anecdote.id} anecdote={anecdote} handleClick={()=>handleClick(anecdote)} />
    )
}
 
export default AnecdoteList;