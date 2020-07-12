import React, { FunctionComponent } from 'react';
import styles from './Backdrop.module.css';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

interface BackdropProps {
    show: boolean;
    onClick?: () => void;
}

const Backdrop: FunctionComponent<BackdropProps> = ({ show, onClick }) => {
    return (
        <>
            <CSSTransition
                in={show}
                classNames={{
                    enterActive: styles.backdropEnterActive,
                    exitActive: styles.backdropExitActive,
                    enter: styles.backdropEnter,
                    exit: styles.backdropExit
                }}
                timeout={150}
                unmountOnExit
                mountOnEnter
            >
                <div className={styles.backdrop} onClick={onClick} />
            </CSSTransition>
        </>
    )
}

export default Backdrop;