import React, { Component } from 'react'

export default class Navbar extends Component {

    render() {
        return (
            <nav className="navbar navbar-expand-sm bg-dark navbar-dark" >
                <a className="navbar-brand" href="#">Business API</a>
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" href="/">Home</a>
                    </li>
                </ul>
            </nav>
        )
    }
}
