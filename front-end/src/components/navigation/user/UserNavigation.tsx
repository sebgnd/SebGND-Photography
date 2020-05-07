import React, { Component } from 'react';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import NavigationItem from './NavigationItem';
import Logo from './Logo';
import './user-navigation.css';

class UserNavigation extends Component<RouteComponentProps, {}> {
    changePage(url: string) {
        this.props.history.push(url);
    }

    public render() {
        return (
            <nav>
                <div className="side-menu" id="left">
                    <NavigationItem name="Home" url="/" />
                    <NavigationItem name="Galleries" url="/galleries" />
                </div>
                <Logo imgSrc="images/logo.png" imgAlt="logo" url="/" />
                <div className="side-menu" id="right">
                    <NavigationItem name="Recent" url="/recent" />
                    <NavigationItem name="Contact" url="/contact" />
                </div>
            </nav>
        );
    }
}

export default withRouter(UserNavigation);
