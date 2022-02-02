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

export const set = (content) => {
  return {
    type: 'SET_NOTIFICATION',
    data: { content }
  }
}

export const remove = () => {
  return {
    type: 'REMOVE_NOTIFICATION'
  }
}

export default notificationReducer