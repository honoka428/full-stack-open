import React from 'react'
import { useSelector } from 'react-redux'

const UserList = () => {
    const users = useSelector( state => state.allUsers)

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
                    { users.map(u => 
                        <tr key={u.id}>
                            <td>{u.name}</td>
                            <td style={{textAlign: 'center'}}>{u.blogCount}</td>
                        </tr>
                    )}
                </tbody>
            </table>

        </div>
    )
}

export { UserList }