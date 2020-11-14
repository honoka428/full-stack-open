const filterReducer = (state = 'ALL', action) => {
    switch (action.type) {
      case 'ALL':
        return 'ALL'
      case 'SET_FILTER':
        return action.filter
      default:
        return state
    }
  }

export const changeFilter = (content) => {
    return {
        type: 'SET_FILTER',
        filter: content
    }
}

export default filterReducer