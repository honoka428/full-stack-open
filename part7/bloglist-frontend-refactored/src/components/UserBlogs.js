import React from 'react'
import { useSelector } from 'react-redux'

const UserBlogs = ({match}) => {

    const blogs = useSelector(state => state.blog)
    const allUsers = useSelector(state => state.allUsers)
    console.log('blogs:', blogs)
    console.log('allUsers ', allUsers)

    const matchedBlogs = match ? blogs.filter(blog => blog.user.id === match.params.id): null

    // const selectedUser = match ? allUsers.filter(user => user.id = match.params.id) : null
        // CALLING THIS SETS ALL ALLUSER ID'S TO BE THE SAME

    console.log('match:', match)
    console.log('matched blogs:', matchedBlogs)

    // console.log(selectedUser)

    return (
        <div>
            { matchedBlogs.length > 0 
                ? 
                <div>
                    <h2>{matchedBlogs[0].user.name}</h2>
                    <ul> { matchedBlogs.map( blog => <li key={blog.id}>{blog.title}</li> ) } </ul>
                </div>
                : <div>This user has no blogs yet.</div>
            }
        </div>
    )
  }

export { UserBlogs }