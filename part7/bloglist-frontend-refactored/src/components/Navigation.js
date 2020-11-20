import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'

const styles = {
    marginTop: 30,
    marginBottom: 30
}

export const Navigation = () =>
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light" style={styles}>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
            <Nav.Link href="#" as="span">
                <Link to='/'> blog </Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
                <Link to='/users'> users </Link>
            </Nav.Link>

            </Nav>
        </Navbar.Collapse>
    </Navbar>