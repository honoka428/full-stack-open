import React from 'react'
import { useSelector } from "react-redux"
import { Blog } from './Blog'

const BlogList = () => {
    const blogs = useSelector(state => state.blog)
    const user = useSelector(state => state.user)

    return(
        <div className="blogList">
            <h2>blogs</h2>
            {blogs
                .sort((a, b) => a.likes - b.likes) // if a.likes - b.likes returns negative, sort a.likes first
                .map(blog =>
                <Blog
                    key={blog.id}
                    blog={blog}
                    user={user}
                />
                )
            }
        </div>
    )
}


export { BlogList }