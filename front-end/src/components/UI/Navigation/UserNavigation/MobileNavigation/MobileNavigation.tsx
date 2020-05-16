import React, { FunctionComponent } from 'react';
import NavigationItem from '../NavigationItem/NavigationItem';

import styles from './MobileNavigation.module.css';

interface MobileNavigationProps {
    opened: boolean;
}

const MobileNavigation: FunctionComponent<MobileNavigationProps> = ({ opened }) => {
    const mobileNav = opened ? `${styles.navigation} ${styles.mobile} ${styles.open}` : `${styles.navigation} ${styles.mobile} ${styles.close}`;

    return (
        <div className={mobileNav}>
            <NavigationItem name="Home" url="/" />
            <NavigationItem name="Galleries" url="/gallery" />
            <NavigationItem name="Recent" url="/recent" />
            <NavigationItem name="Contact" url="/contact" />
        </div>
    )
}

export default MobileNavigation;