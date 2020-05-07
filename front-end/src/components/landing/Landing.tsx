import React, { FunctionComponent } from 'react';
import Parallax from '../Parallax/Parallax';
import { LandingContainer, ParallaxContent, LandingButtonContainer } from './landing.style';

import { Button } from '../Button';

const Landing: FunctionComponent = () => {
    return (
        <LandingContainer>
            <Parallax img="images/parallax-1.jpg" speed={0.5}>
                <LandingButtonContainer>
                        <Button variant="classic" size="medium" onClick={() => {}}>See this photo</Button>
                    </LandingButtonContainer>
            </Parallax>
        </LandingContainer>
    )
}

export default Landing;