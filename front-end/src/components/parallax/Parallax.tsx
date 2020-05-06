import React, { Component, useEffect, useRef, useState, RefObject } from 'react';
import { ParallaxContainer } from './parallax.style';
import { throttle } from 'lodash';

interface ParallaxProp {
    img: string;
    speed: number;
}

interface ParallaxState {
    backgroundPositionY: string;
}

class Parallax extends Component<ParallaxProp, ParallaxState> {
    private parallaxElemRef: RefObject<HTMLDivElement>;
    private throttleTime: number;
    private topOffset: number;

    constructor(props: ParallaxProp) {
        super(props);

        this.topOffset = 0;
        this.parallaxElemRef = React.createRef();
        this.throttleTime = 5;

        this.handleResize = this.handleResize.bind(this);
        this.handleScroll = this.handleScroll.bind(this);

        this.state = {
            backgroundPositionY: ""
        }
    }

    isElementVisible() {
        if (this.parallaxElemRef && this.parallaxElemRef.current) {
            const position: DOMRect = this.parallaxElemRef.current.getBoundingClientRect();
            if (position.top < window.innerHeight && position.bottom >= 0) {
                return true;
            }
        }
        return false;
    }

    updatePosition() {
        if (!this.isElementVisible()) {
            return;
        }
        const bottomPageOffset = window.scrollY + window.innerHeight;
        const offset = bottomPageOffset - this.parallaxElemRef.current!.offsetTop;
        const newTop = this.topOffset - offset * this.props.speed;
        this.setState({ backgroundPositionY: `${newTop}px` });
    }

    getTopOffset() {
        return this.parallaxElemRef.current!.clientHeight * this.props.speed;
    }

    handleScroll() {
        this.updatePosition();
    }

    handleResize() {
        this.topOffset = this.getTopOffset();
        this.updatePosition();
    }

    addEventListener() {
        window.addEventListener('scroll', this.handleScroll);
        window.addEventListener('resize', this.handleResize);
    }

    removeEventListener() {
        window.removeEventListener('scroll', this.handleScroll);
        window.removeEventListener('resize', this.handleResize);
    }

    componentDidMount() {
        this.topOffset = this.getTopOffset();
        this.addEventListener();
    }

    componentWillUnmount() {
        this.removeEventListener();
    }

    render() {
        const { img } = this.props;
        return (
            <ParallaxContainer ref={this.parallaxElemRef} style={{...this.state}} backgroundImage={img} />
        )
    }
}

export default Parallax;