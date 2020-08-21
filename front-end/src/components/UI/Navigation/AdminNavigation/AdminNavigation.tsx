import React, { FunctionComponent, useState } from 'react';

import TopNavigation from './TopNavigation/TopNavigation';
import { INavItem } from '../NavigationItem/NavigationItem';

const AdminNavigation: FunctionComponent = () => {
    const [moreNavOpen, setMoreNavOpen] = useState<boolean>(false);

    const moreItems: INavItem[] = [
        { url: '/admin/password', name: 'Change password' },
    ];
    const normalItems = [
        { url: '/admin/home', name: 'Home' },
        { url: '/admin/gallery-settings', name: 'Gallery Settings' },
        { url: '/admin/messages', name: 'Messages' }
    ];

    const toggleMoreNav = () => {
        setMoreNavOpen(prevMoreNavOpen => !prevMoreNavOpen);
    }

    return (
        <nav>
            <TopNavigation 
                moreItems={moreItems} 
                normalItems={normalItems} 
                onMoreClick={toggleMoreNav}
                isMoreOpen={moreNavOpen}
            />
        </nav>
    )
}

export default AdminNavigation;
