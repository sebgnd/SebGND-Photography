import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import userStyles from './UserNavigationItem.module.css';
import adminStyles from './AdminNavigationItem.module.css';

export interface INavItem {
    url: string;
    name: string;
} 

interface NavigationItemProps {
    name: string;
    url: string;
    style: 'admin' | 'user';
    onClick?: () => void;
}

const NavigationItem: FunctionComponent<NavigationItemProps> = ({ name, url, onClick, style }) => {
    const getStyles = () => {
        switch (style) {
            case 'admin': return adminStyles;
            case 'user': return userStyles;
            default: return userStyles;
        }
    }

    const styles = getStyles();

    return (
        <Link onClick={onClick} className={styles.navItem} to={url}>{name}</Link>
    )
}   

export default NavigationItem;
