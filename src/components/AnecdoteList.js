import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { vote } from "../reducers/anecdoteReducer";
import { remove, set } from "../reducers/notificationReducer";

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
  const anecdotes = useSelector(state => state.anecdotes)
  const dispatch = useDispatch()
  const handleClick = (id, content) => {
    dispatch(vote(id))
    dispatch(set(`you voted ${content}`))
    setTimeout(() => {
      dispatch(remove())
    }, 5000)
  }

  return anecdotes.map(anecdote =>
      <Anecdote key={anecdote.id} anecdote={anecdote} handleClick={()=>handleClick(anecdote.id, anecdote.content)} />
    )
}
 
export default AnecdoteList;