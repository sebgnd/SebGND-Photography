import React, { FunctionComponent } from 'react';
import NavigationItem from '../NavigationItem/NavigationItem';
import HamburgerButton from './HamburgerButton/HamburgerButton';
import Logo from './NavigationLogo/Logo';

import styles from './TopNavigation.module.css';
import navigationStyle from '../UserNavigation.module.css';

interface TopNavigationProps {
    onToggleMobile(): void;
}

const TopNavigation: FunctionComponent<TopNavigationProps> = ({ onToggleMobile }) => {
    const topNav = `${navigationStyle.navigation} ${styles.top}`;
    
    return (
        <div className={topNav}>
            <HamburgerButton onClick={onToggleMobile} />
            <div className={styles.sideMenu}>
                <NavigationItem name="Home" url="/" />
                <NavigationItem name="Galleries" url="/gallery" />
            </div>
            <Logo imgSrc="/images/logo.png" imgAlt="logo" url="/" />
            <div className={styles.sideMenu}>
                <NavigationItem name="Recent" url="/recent" />
                <NavigationItem name="Contact" url="/contact" />
            </div>
        </div>
    )
}

export default TopNavigation;