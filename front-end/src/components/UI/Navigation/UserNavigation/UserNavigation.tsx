import React, { useEffect, useState, FunctionComponent, useRef } from 'react';
import { throttle } from 'lodash';

import TopNavigation from './TopNavigation/TopNavigation';
import MobileNavigation from './MobileNavigation/MobileNavigation'
import Backdrop from '../../Backdrop/Backdrop';

const UserNavigation: FunctionComponent = () => {
    const [mobileNavOpened, setMobileNavOpened] = useState<boolean>(false);
    const mobileOpenedRef = useRef<boolean>(false);

    const maxPixelForMobile: number = 850;
    const throttleTime: number = 200;

    useEffect(() => {
        window.addEventListener('resize', toggleMobileOnResizeThrottled);

        return () => {
            window.removeEventListener('resize', toggleMobileOnResizeThrottled);
        }
    }, []);

    const toggleMobileOnResize = () => {
        const width: number = window.innerWidth;
        if (width > maxPixelForMobile && mobileOpenedRef.current) {
            toggleMobileNav();
        }
    }

    const toggleMobileOnResizeThrottled = throttle(toggleMobileOnResize, throttleTime);

    const toggleMobileNav = () => {
        setMobileNavOpened((prevMobileNavOpened: boolean) => {
            mobileOpenedRef.current = !prevMobileNavOpened;
            return !prevMobileNavOpened;
        });
    }

    return (
        <>
            <nav>
                <TopNavigation onToggleMobile={toggleMobileNav} />
                <MobileNavigation clicked={toggleMobileNav} opened={mobileNavOpened} />
            </nav>
            <Backdrop show={mobileNavOpened} onClick={toggleMobileNav} />
        </>
    )
} 

export default UserNavigation;