const notificationReducer = (state = null, action) => {
  switch(action.type) {
    case 'SET_NOTIFICATION':
      return action.data.content
    case 'REMOVE_NOTIFICATION':
      return null
    default:
      return state
  }
}

export const set = (content, timeInSeconds) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: { content }
    })
    setTimeout(()=>{
      dispatch(remove())
    }, timeInSeconds * 1000)
  }
}

export const remove = () => {
  return {
    type: 'REMOVE_NOTIFICATION'
  }
}

export default notificationReducer