import React, { Component } from 'react'

export default class Navbar extends Component {
    setActive = () => {
        if (window.location.pathname === '/') {
            document.getElementsByClassName('nav-item')[0].style.borderBottom = '3px solid #51a9ff'
            document.getElementsByClassName('nav-item')[1].style.borderBottom = 'none'
            document.getElementsByClassName('nav-item')[2].style.borderBottom = 'none'
        }
        else if (window.location.pathname.includes('/website')) {
            document.getElementsByClassName('nav-item')[1].style.borderBottom = '3px solid #51a9ff'
            document.getElementsByClassName('nav-item')[0].style.borderBottom = 'none'
            document.getElementsByClassName('nav-item')[2].style.borderBottom = 'none'
        }
        else if (window.location.pathname.includes('/unit')) {
            document.getElementsByClassName('nav-item')[2].style.borderBottom = '3px solid #51a9ff'
            document.getElementsByClassName('nav-item')[0].style.borderBottom = 'none'
            document.getElementsByClassName('nav-item')[1].style.borderBottom = 'none'
        }
    }
    componentDidMount() {
        this.setActive()
    }

    render() {
        return (
            <nav className="navbar navbar-expand-sm bg-dark navbar-dark" >
                <a className="navbar-brand" href="#">Crypto Management</a>
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" href="/">Home</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/website">Website</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/unit">Unit</a>
                    </li>
                </ul>
            </nav>
        )
    }
}
