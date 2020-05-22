import React, { Component, Fragment } from 'react';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';

import TopNavigation from './TopNavigation/TopNavigation';
import MobileNavigation from './MobileNavigation/MobileNavigation'

import styles from './UserNavigation.module.css';

interface UserNavigationState {
    mobileNavOpened: boolean;
}

class UserNavigation extends Component<RouteComponentProps, UserNavigationState> {
    constructor(props: RouteComponentProps) {
        super(props);

        this.toggleMobileNav = this.toggleMobileNav.bind(this);
        this.state = {
            mobileNavOpened: false
        }
    }

    toggleMobileNav() {
        this.setState(prevState => {
            return { mobileNavOpened: !prevState.mobileNavOpened }
        });
    }

    render() {
        const topNav = `${styles.navigation} ${styles.top}`;

        return (
            <nav>
                <TopNavigation onToggleMobile={this.toggleMobileNav} />
                <MobileNavigation clicked={this.toggleMobileNav} opened={this.state.mobileNavOpened} />
            </nav>
        );
    }
}

export default withRouter(UserNavigation);
