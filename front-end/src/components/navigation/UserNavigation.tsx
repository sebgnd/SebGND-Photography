import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './user-navigation.css';

class UserNavigation extends Component {

    public render() {
        return (
            <nav>
                <div className="side-menu" id="left">
                    <Link to="">Home</Link>
                    <Link to="galleries">Galleries</Link>
                </div>
                <Link to="" id="center-menu"><img src="images/logo.png" alt="logo"/></Link>
                <div className="side-menu" id="right">
                    <Link to="recent">Recent</Link>
                    <Link to="contact">Contact</Link>
                </div>
            </nav>
        );
    }
}

export default UserNavigation;
