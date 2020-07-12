import React, { Component, useEffect, useRef, useState, RefObject, FunctionComponent } from 'react';
import ParallaxContainer from './ParallaxContainer';
import { throttle } from 'lodash';

interface ParallaxProp {
    img: string;
    speed: number;
}

interface BackgroundStyle {
    backgroundPositionY: string;
    backgroundSize: string;
}


const Parallax: FunctionComponent<ParallaxProp> = ({ img, speed, children }) => {
    const parallaxElemRef = useRef<HTMLDivElement>(null);
    const topOffset = useRef<number>(0);
    const height = useRef<number>(0);

    const [backgroundStyle, setBackgroundStyle] = useState<BackgroundStyle>({
        backgroundPositionY: '',
        backgroundSize: 'cover'
    });

    const throttleTime: number = 7;

    const isElementVisible = (): boolean => {
        if (parallaxElemRef && parallaxElemRef.current) {
            const position: DOMRect = parallaxElemRef.current.getBoundingClientRect();
            if (position.top < window.innerHeight && position.bottom >= 0) {
                return true;
            }
        }
        return false;
    }

    const updateBackgroundSize = (): void => {
        const elementHeight = parallaxElemRef.current!.scrollHeight;

        if (elementHeight > window.innerHeight) {
            setBackgroundStyle((prevBackgroundStyle) => { 
                return {
                    ...prevBackgroundStyle, 
                    backgroundSize: `auto ${elementHeight}px` 
                }
            });
        } else {
            setBackgroundStyle((prevBackgroundStyle) => { 
                return {
                    ...prevBackgroundStyle, 
                    backgroundSize: 'cover' 
                }
            });
        }
    }

    const getTopOffset = (): number => {
        return window.innerHeight * speed;
    }

    const getNewTop = (): number => {
        const bottomPageOffset = window.scrollY + window.innerHeight;
        const intoElementOffset = bottomPageOffset - parallaxElemRef.current!.offsetTop;
        const newTop = topOffset.current - intoElementOffset * speed;
        return newTop;
    }

    const updatePosition = (): void => {
        if (!isElementVisible()) {
            return;
        }
        const newTop = getNewTop();
        setBackgroundStyle(prevBackgroundStyle => { 
            return {
                ...prevBackgroundStyle,
                backgroundPositionY: `${newTop}px` 
            }
        });
    }

    const handleScroll = (): void => {
        updatePosition();
    }
    const handleScrollThrottled = throttle(handleScroll, throttleTime);

    const handleResize = (): void => {
        topOffset.current = getTopOffset();
        updateBackgroundSize();
        updatePosition();
    }
    const handleResizeThrottled = throttle(handleResize, throttleTime);

    const addEventListener = (): void => {
        window.addEventListener('scroll', handleScrollThrottled);
        window.addEventListener('resize', handleResizeThrottled);
    }

    const removeEventListener = (): void => {
        window.removeEventListener('scroll', handleScrollThrottled);
        window.removeEventListener('resize', handleResizeThrottled);
    }

    useEffect(() => {
        topOffset.current = getTopOffset();
        height.current = parallaxElemRef.current!.clientHeight;

        if (height.current > window.innerHeight) {
            parallaxElemRef.current!.style.backgroundSize = `auto ${height.current}`;
        }
        parallaxElemRef.current!.style.backgroundPositionY = `${getNewTop()}px`;
        
        addEventListener();

        return () => {
            removeEventListener();
        };
    }, []);

    return (
        <ParallaxContainer ref={parallaxElemRef} style={{...backgroundStyle}} backgroundImage={img}>
            {children}
        </ParallaxContainer>
    )
}

export default Parallax;