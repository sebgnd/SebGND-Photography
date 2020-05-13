import React, { Component } from 'react';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import NavigationItem from './NavigationItem/NavigationItem';
import Logo from './NavigationLogo/Logo';
import styles from './UserNavigation.module.css';

class UserNavigation extends Component<RouteComponentProps, {}> {
    changePage(url: string) {
        this.props.history.push(url);
    }

    public render() {
        return (
            <nav className={styles.navigation}>
                <div className={styles.sideMenu}>
                    <NavigationItem name="Home" url="/" />
                    <NavigationItem name="Galleries" url="/gallery" />
                </div>
                <Logo imgSrc="/images/logo.png" imgAlt="logo" url="/" />
                <div className={styles.sideMenu}>
                    <NavigationItem name="Recent" url="/recent" />
                    <NavigationItem name="Contact" url="/contact" />
                </div>
            </nav>
        );
    }
}

export default withRouter(UserNavigation);
