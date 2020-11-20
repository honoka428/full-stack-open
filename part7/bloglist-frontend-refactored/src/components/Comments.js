import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { getCommentsForBlog } from '../reducers/commentReducer'

export const Comments = ({blogName}) => {
    const dispatch = useDispatch()
    const comments = useSelector(state => state.comment)

    console.log(comments)
    useEffect(() => {
        dispatch(getCommentsForBlog(blogName))
    }, [dispatch])


    return (
        <div>
            <h2>Comments</h2>
            <ul>
                { comments && comments.length > 0
                    ? comments.map(comment => <li key={comment.id}>{comment.content}</li>)
                    : <div>This blog has no comments yet.</div>
                }
            </ul>
        </div>
    )
}