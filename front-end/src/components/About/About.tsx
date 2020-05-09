import React, { FunctionComponent } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import Parallax from '../UI/Parallax/Parallax';
import styles from './About.module.css';
import { Button } from '../UI/Button';
import { Title, Text } from '../Styled/text';

import Paths from '../../helper/Paths';

const About: FunctionComponent<RouteComponentProps> = (props) => {
    const goToContact = () => {
        const contactLink = Paths.contact();
        props.history.push(contactLink);
    }
    return (
            <div className={styles.aboutContainer}>
                <div className={styles.titleContainer}>
                    <Title color="black">About me and my gear</Title>
                </div>
                <div className={styles.aboutContent}>
                    <div className={`${styles.textContainer} ${styles.aboutMe}`}>
                        <Text size="medium" color="black" weight="normal"> 
                            My name is Sebastien Gnd and i am a French amateur photographer based in Limoges, France. 
                            My passion for photography dates back to 2016 when I was in high school. My other passions 
                            include technology, video games, cars, cinema … I am studying in Computer Science.
                        </Text>
                        <div className={styles.contactButtonContainer}>
                            <Button variant="clasic" size="medium" onClick={goToContact}>Contact me</Button>
                        </div>
                    </div>
                    <div className={`${styles.textContainer} ${styles.gear}`}>
                        <Text size="medium" color="black" weight="normal"> 
                            - Canon 70D - Sigma 18-35 f1.8 <br />
                            - Sigma 50-100 f1.8 <br />
                            - Tokina 11-20 f2.8 <br />
                            - Manfrotto BeFree tripod <br />
                            - Lowepro Protactict 450 backpack <br />
                            - Hoya ND1000 (72 - 82 mm) <br />
                        </Text>
                    </div>
                </div>
            </div>
    )
}

export default withRouter(About);