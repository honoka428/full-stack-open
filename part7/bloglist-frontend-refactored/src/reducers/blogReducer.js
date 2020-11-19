import blogService from '../services/blogs'

const initialBlogs = []

const blogReducer = (state = initialBlogs, action) => {
    switch (action.type) {
        case 'NEW_BLOG':
            return [...state, action.data]

        case 'INIT_BLOGS':
            return action.data

        default:
            return state
    }
}

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch({
          type: 'INIT_BLOGS',
          data: blogs,
        })
    }
}

export const createBlog = (newBlog, token, setVisible, visible) => {
    blogService
        .createOne(token, newBlog)
        .then(response => {
            console.log(response)
            return {
                type: 'NEW_BLOG',
                data: response
            }
        })
    setVisible(!visible)
}

export { blogReducer }