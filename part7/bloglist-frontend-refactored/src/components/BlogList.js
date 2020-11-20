import React from 'react'
import { useSelector } from "react-redux"

import { Link } from 'react-router-dom'

const BlogList = () => {
    const blogs = useSelector(state => state.blog)

    
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5,
        fontSize: 20
    }

    return(
        <div className="blogList">
            <h2>blogs</h2>
            {blogs
                .sort((a, b) => a.likes - b.likes) // if a.likes - b.likes returns negative, sort a.likes first
                .map(blog =>
                    <div style={blogStyle} className="blog" key={blog.id}>
                        <Link to={`/blogs/${blog.id}`}>
                        {blog.title} by {blog.author}
                        </Link>
                    </div>
                )
            }
        </div>
    )
}


export { BlogList }