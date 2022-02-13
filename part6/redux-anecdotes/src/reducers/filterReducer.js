const filterReducer = (state = '', action) => {
  switch(action.type) {
    case 'SET_FILTER':
      return action.data.keyword
    default:
      return state
  }
}

export const setFilter = (keyword) => {
  return {
    type: 'SET_FILTER',
    data: { keyword }
  }
}

export default filterReducer