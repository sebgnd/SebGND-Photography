import React, { FunctionComponent } from 'react';
import styles from './HamburgerButton.module.css';
import { ButtonContainer } from '../../../../../Styled/container';

interface HamburgerButtonProps {
    onClick?(): void;
}

const HamburgerButton: FunctionComponent<HamburgerButtonProps> = (props) => {
    return (
        <ButtonContainer onClick={props.onClick}>
            <div className={styles.hamburgerButton}>
                <i className="fas fa-bars" />
            </div>
        </ButtonContainer>
    )
}

export default HamburgerButton;