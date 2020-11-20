import React from 'react'
import { Link } from 'react-router-dom'

export const Navigation = () =>
    <div>
        <Link to='/' style={{paddingLeft: 20 }}> blog </Link>
        <Link to='/users' style={{paddingLeft: 10 }}> users </Link>
    </div>
