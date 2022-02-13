const defaultState = {
  content:null,
  timeoutID: null
}

const notificationReducer = (state = defaultState, action) => {
  switch(action.type) {
    case 'SET_NOTIFICATION':
      if(state.timeoutID) {
        clearTimeout(state.timeoutID)
      }
      return {
        content: action.data.content,
        timeoutID: null
      }
    case 'REMOVE_NOTIFICATION':
      return {
        content:null,
        timeoutID: null
      }
    case 'SET_TIMEOUT_ID':
      return {
        content: state.content,
        timeoutID: action.data.timeoutID
      }
    default:
      return state
  }
}

export const setNotification = (content, timeInSeconds) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: { content }
    })
    const timeoutID = setTimeout(()=>{
      dispatch(removeNotification())
    }, timeInSeconds * 1000)
    setTimeoutID(timeoutID)
  }
}

export const removeNotification = () => {
  return {
    type: 'REMOVE_NOTIFICATION'
  }
}

const setTimeoutID = (timeoutID) => {
  return {
    type: 'SET_TIMEOUT_ID',
    data: { timeoutID }
  }
}

export default notificationReducer