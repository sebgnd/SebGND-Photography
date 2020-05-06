import React, { FunctionComponent, useEffect, useRef } from 'react';
import { ParallaxContainer } from './parallax.style';
import { throttle } from 'lodash';

interface ParallaxProp {
    img: string;
    speed: number;
}

const Parallax: FunctionComponent<ParallaxProp> = (props) => {
    const { img, speed } = props;
    const parallaxElemRef = useRef<HTMLDivElement>(null);
    const throttleTime: number = 1;
    let divHeight: number = 0;
    let topOffset: number = 0;

    const isElementVisible = () => {
        if (parallaxElemRef && parallaxElemRef.current) {
            const position: DOMRect = parallaxElemRef.current.getBoundingClientRect();
            if (position.top < window.innerHeight && position.bottom >= 0) {
                return true;
            }
        }
        return false;
    }

    const handleScroll = throttle(() => {
        if (isElementVisible()) {
            const bottomPageOffset = window.scrollY + window.innerHeight;
            const offset = bottomPageOffset - parallaxElemRef.current!.offsetTop;
            const newTop = topOffset - offset * speed;
            parallaxElemRef.current!.style.backgroundPositionY = `${newTop}px`;
        }
    }, throttleTime);

    useEffect(() => {
        divHeight = parallaxElemRef.current!.offsetHeight;
        topOffset = divHeight! * speed;
        parallaxElemRef.current!.style.backgroundPositionY = `${topOffset!}`;

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, [])

    return (
        <ParallaxContainer ref={parallaxElemRef} backgroundImage={img} top={topOffset} />
    )
}

export default Parallax;