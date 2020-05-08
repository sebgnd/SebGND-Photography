import React, { Component, useEffect, useRef, useState, RefObject } from 'react';
import { ParallaxContainer, Relative } from './parallax.style';
import { throttle } from 'lodash';

interface ParallaxProp {
    img: string;
    speed: number;
}

interface ParallaxState {
    backgroundPositionY: string;
    backgroundSize: string;
}

class Parallax extends Component<ParallaxProp, ParallaxState> {
    private parallaxElemRef: RefObject<HTMLDivElement>;
    private throttleTime: number;
    private topOffset: number;
    private height: number;

    constructor(props: ParallaxProp) {
        super(props);

        this.topOffset = 0;
        this.parallaxElemRef = React.createRef();
        this.throttleTime = 5;
        this.height = 0;

        this.handleResize = this.handleResize.bind(this);
        this.handleScroll = this.handleScroll.bind(this);

        this.state = {
            backgroundPositionY: '',
            backgroundSize: 'cover'
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

    updateBackgroundSize() {
        const elementHeight = this.parallaxElemRef.current!.scrollHeight;

        if (elementHeight > window.innerHeight) {
            this.setState({ backgroundSize: `auto ${elementHeight}px` });
        } else {
            this.setState({ backgroundSize: 'cover' });
        }
    }

    updatePosition() {
        if (!this.isElementVisible()) {
            return;
        }
        const newTop = this.getNewTop();
        this.setState({ backgroundPositionY: `${newTop}px` });
    }

    getTopOffset() {
        return window.innerHeight * this.props.speed;
    }

    getNewTop() {
        const bottomPageOffset = window.scrollY + window.innerHeight;
        const intoElementOffset = bottomPageOffset - this.parallaxElemRef.current!.offsetTop;
        const newTop = this.topOffset - intoElementOffset * this.props.speed;
        return newTop;
    }

    handleScroll() {
        this.updatePosition();
    }

    handleResize() {
        this.topOffset = this.getTopOffset();
        this.updateBackgroundSize();
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
        this.height = this.parallaxElemRef.current!.clientHeight;

        if (this.height > window.innerHeight) {
            this.parallaxElemRef.current!.style.backgroundSize = `auto ${this.height}`;
        }
        this.parallaxElemRef.current!.style.backgroundPositionY = `${this.getNewTop()}px`;
        
        this.addEventListener();
    }

    componentWillUnmount() {
        this.removeEventListener();
    }

    render() {
        const { img } = this.props;
        return (
            <ParallaxContainer ref={this.parallaxElemRef} style={{...this.state}} backgroundImage={img}>
                {this.props.children}
            </ParallaxContainer>
        )
    }
}

export default Parallax;