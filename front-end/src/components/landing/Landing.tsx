import React, { FunctionComponent } from 'react';
import Parallax from '../parallax/Parallax';
import { LandingContainer } from './landing.style';

const Landing: FunctionComponent = () => {
    return (
        <LandingContainer>
            <Parallax img="images/parallax-1.jpg" speed={1} />
        </LandingContainer>
    )
}

export default Landing;