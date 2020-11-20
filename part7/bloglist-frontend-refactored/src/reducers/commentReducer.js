import commentService from '../services/comments.js'

const initialState = null

const commentReducer = (state = initialState, action) => {
    switch(action.type){
        case 'GET_COMMENTS_FOR_BLOG':
            return action.data
        default:
            return state
    }
}

export const getCommentsForBlog = (blogName) => {

    return async dispatch => {
        const comments = await commentService.getAll()
        console.log('all comments:', comments)

        const filteredComments = await comments.filter(comment => comment.blog === blogName)

        console.log('filtered comments:', filteredComments)

        dispatch({
            type: 'GET_COMMENTS_FOR_BLOG',
            data: filteredComments
        })
    }
}

export { commentReducer } 