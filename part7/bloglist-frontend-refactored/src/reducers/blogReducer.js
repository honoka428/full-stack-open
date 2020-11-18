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

export const initializeBlogs = (blogs) => {
    console.log(blogs)
    return {
        type: 'INIT_BLOGS',
        data: blogs
    }
}

export const createBlog = (newBlog, token, setErrorMessage, setErrorType, setVisible, visible) => {
    try {
        blogService
            .createOne(token, newBlog)
            .then(response => {
                console.log(response)
                return {
                    type: 'NEW_BLOG',
                    data: response
                }
            })
        setErrorMessage('Successfully created blog post.')
        setErrorType('greenError')
        setVisible(!visible)
    }
    catch(err) {
        console.log(err)
        setErrorMessage('There was a problem creating your blog post.')
        setErrorType('redError')
    }

    setTimeout(() => {
      setErrorMessage(null)
    }, 2000)
  }


export { blogReducer }