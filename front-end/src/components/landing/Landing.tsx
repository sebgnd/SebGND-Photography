import React, { FunctionComponent } from 'react';
import Parallax from '../Parallax/Parallax';
import { LandingContainer } from './landing.style';

const Landing: FunctionComponent = () => {
    return (
        <LandingContainer>
            <Parallax img="images/parallax-1.jpg" speed={0.5} />
        </LandingContainer>
    )
}

export default Landing;