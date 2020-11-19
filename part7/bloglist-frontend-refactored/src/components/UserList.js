import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const UserList = () => {

    const allUsers = useSelector( state => state.allUsers)

    return (
        <div>
            <h2>Users</h2>
            <br/>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>blogs created</th>
                    </tr>
                </thead>
                <tbody>
                    { allUsers.map(u => 
                        <tr key={u.id}>
                            <td><Link to={`/users/${u.id}`}>{u.name}</Link></td>
                            <td style={{textAlign: 'center'}}>{u.blogCount}</td>
                        </tr>
                    )}
                </tbody>
            </table>

        </div>
    )
}

export { UserList }