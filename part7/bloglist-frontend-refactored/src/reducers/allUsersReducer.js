
import userService from '../services/users'
import blogsService from '../services/blogs'

const allUsersReducer = (state = [], action) => {
    switch(action.type){
        case 'GET_ALL':
            return action.data
        default:
            return state
    }
}

export const getAllUsers = () => {
    return async dispatch => {
        const allUsers = await userService.getAll()
        const blogs = await blogsService.getAll()

        allUsers.forEach(u => {
            u.blogCount = 0 // init blogCount key for each user as 0
            blogs.forEach(b => { // loop through all blogs. if blog is by user, add to blog count.
                u.blogCount = 
                    (b.user.username === u.username)
                    ? u.blogCount + 1 
                    : u.blogCount
            })
        })

        dispatch({
          type: 'GET_ALL',
          data: allUsers,
        })
    }
}

export { allUsersReducer }
