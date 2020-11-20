import React from 'react'
import { useSelector } from "react-redux"
import { Table } from 'react-bootstrap'
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
        <div className="blogList" style={{marginTop: 30}}>
            <Table striped>
                <thead>
                    <tr>
                        <th> Blog Name & Author</th>
                    </tr>
                </thead>
                <tbody>
                    {blogs
                        .sort((a, b) => a.likes - b.likes) // if a.likes - b.likes returns negative, sort a.likes first
                        .map(blog =>
                            <tr style={blogStyle} className="blog" key={blog.id}>
                                <td>
                                    <Link to={`/blogs/${blog.id}`}> {blog.title} by {blog.author} </Link>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </Table>
        </div>
    )
}


export { BlogList }