import React, { FunctionComponent } from 'react';
import Parallax from '../Parallax/Parallax';

import { AboutContainer, TitleContainer, MainContent, AboutMe, Gear, TextContainer } from './about.style';
import { Title, Text } from '../regular/text';

const About: FunctionComponent = () => {
    return (
        <AboutContainer>
            <Parallax img="images/parallax-2.jpg" speed={0.5}>
                <TitleContainer>
                    <Title color="black">About me and my gear</Title>
                </TitleContainer>
                <MainContent>
                    <AboutMe>
                        <Text size="medium" color="black" weight="normal"> 
                            My name is Sebastien Gnd and i am a French amateur photographer based in Limoges, France. 
                            My passion for photography dates back to 2016 when I was in high school. My other passions 
                            include technology, video games, cars, cinema … I am studying in Computer Science.
                        </Text>
                    </AboutMe>
                    <Gear>
                        <Text size="medium" color="black" weight="normal"> 
                            - Canon 70D - Sigma 18-35 f1.8 <br />
                            - Sigma 50-100 f1.8 <br />
                            - Tokina 11-20 f2.8 <br />
                            - Manfrotto BeFree tripod <br />
                            - Lowepro Protactict 450 backpack <br />
                            - Hoya ND1000 (72 - 82 mm) <br />
                        </Text>
                    </Gear>
                </MainContent>
            </Parallax>
        </AboutContainer>
    )
}

export default About;