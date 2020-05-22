import React, { FunctionComponent } from 'react';
import NavigationItem from '../NavigationItem/NavigationItem';

import styles from './MobileNavigation.module.css';

interface MobileNavigationProps {
    opened: boolean;
    clicked: () => void;
}

const MobileNavigation: FunctionComponent<MobileNavigationProps> = ({ opened, clicked }) => {
    const mobileNav = opened ? `${styles.navigation} ${styles.mobile} ${styles.open}` : `${styles.navigation} ${styles.mobile} ${styles.close}`;

    return (
        <div className={mobileNav}>
            <NavigationItem onClick={clicked} name="Home" url="/" />
            <NavigationItem onClick={clicked} name="Galleries" url="/gallery" />
            <NavigationItem onClick={clicked} name="Recent" url="/recent" />
            <NavigationItem onClick={clicked} name="Contact" url="/contact" />
        </div>
    )
}

export default MobileNavigation;