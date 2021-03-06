import React, { FunctionComponent } from 'react';
import styles from './Backdrop.module.css';
import { CSSTransition } from 'react-transition-group';

interface BackdropProps {
    show: boolean;
    zIndex?: number;
    onClick?: () => void;
}

const Backdrop: FunctionComponent<BackdropProps> = ({ show, zIndex, onClick }) => {
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
                <div className={styles.backdrop} style={{ zIndex }} onClick={onClick} />
            </CSSTransition>
        </>
    )
}

export default Backdrop;