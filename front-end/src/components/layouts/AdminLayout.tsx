import React, { FunctionComponent } from 'react';

import AdminNavigation from '../UI/Navigation/AdminNavigation/AdminNavigation';

const UserLayout: FunctionComponent = ({ children }) => {
    return (
        <>
            <AdminNavigation />
            <div id="admin" style={{ paddingTop: '140px', paddingBottom: '70px' }}>
                {children}
            </div>
        </>
    );
}

export default UserLayout;