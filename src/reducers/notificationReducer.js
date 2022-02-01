const notificationReducer = (state = null, action) => {
  switch(action.type) {
    case 'SET':
      return action.data.content
    case 'REMOVE':
      return null
    default:
      return state
  }
}

export const set = (content) => {
  return {
    type: 'SET',
    data: { content }
  }
}

export const remove = () => {
  return {
    type: 'REMOVE'
  }
}

export default notificationReducer