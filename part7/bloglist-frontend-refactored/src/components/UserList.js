import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const UserList = () => {

    const allUsers = useSelector( state => state.allUsers)

    return (
        <div>
            <h2>Users</h2>
            <br/>
            <Table striped>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Blogs Created</th>
                    </tr>
                </thead>
                <tbody>
                    { allUsers.map(u => 
                        <tr key={u.id}>
                            <td><Link to={`/users/${u.id}`}>{u.name}</Link></td>
                            <td>{u.blogCount}</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    )
}

export { UserList }