import React, { FunctionComponent } from 'react';

import UserNavigation from '../UI/Navigation/UserNavigation/UserNavigation';
import Footer from '../UI/Footer/Footer';

const UserLayout: FunctionComponent = ({ children }) => {
    return (
        <>
            <UserNavigation />
            <div id="user" style={{ paddingTop: '81px', paddingBottom: '70px' }}>
                {children}
            </div>
            <Footer />
        </>
    );
}

export default UserLayout;