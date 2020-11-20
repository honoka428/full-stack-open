import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { getCommentsForBlog } from '../reducers/commentReducer'
import commentsService from '../services/comments'
import { toggleOnNotification, toggleOffNotification } from '../reducers/notificationReducer'

export const Comments = ({blogName}) => {

    const [ newComment, setNewComment ] = useState('')
    const dispatch = useDispatch()

    const comments = useSelector(state => state.comment)
    const notification = useSelector(state => state.notification)

    useEffect(() => {
        dispatch(getCommentsForBlog(blogName))
    }, [dispatch, blogName, notification])

    const handleCreateComment = () => {
        commentsService.addOne({
            blog: blogName,
            comment: newComment
        })

        dispatch(toggleOnNotification({
            type: 'greenError',
            message: 'New comment added!'
        }))

        setTimeout(() => {
            dispatch(toggleOffNotification())
        }, 5000)

        setNewComment('')
    }

    return (
        <div>
            <h2>Comments</h2>
            <input
                value={newComment}
                type='text'
                onChange={({target}) => setNewComment(target.value)}
            /> <button onClick={handleCreateComment}>add comment</button>
            <ul>
                { comments && comments.length > 0
                    ? comments.map(comment => <li key={comment.id}>{comment.content}</li>)
                    : <div>This blog has no comments yet.</div>
                }
            </ul>
        </div>
    )
}