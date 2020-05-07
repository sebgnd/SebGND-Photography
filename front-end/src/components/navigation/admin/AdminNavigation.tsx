import * as React from 'react';
import './user-navigation.css';

class AdminNavigation extends React.Component {

    public render() {
        return (
            <nav>
                <div className="side-menu" id="left">
                    <a href="">Home</a>
                    <a href="galleries">Galleries</a>
                </div>
                <a id="center-menu" href=""><img src="res/logo.png" alt="logo"/></a>
                <a id="hamburger-menu"><i className="fas fa-bars"></i></a>
                <div className="side-menu" id="right">
                    <a href="recent">Recent</a>
                    <a href="contact">Contact</a>
                </div>
            </nav>
        );
    }
}

export default AdminNavigation;
