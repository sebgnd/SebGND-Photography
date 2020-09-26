import React, { FunctionComponent, MouseEvent } from 'react';
import { CSSTransition } from 'react-transition-group';
import styles from './Modal.module.css';

import Button from '../Button/Button/Button';
import Backdrop from '../Backdrop/Backdrop';
import Spinner from '../../UI/Spinner/Spinner';

type Size = 'small' | 'medium' | 'big';

interface ModalProps {
    title: string;
    isOpen: boolean;
    cancelText?: string;
    confirmText?: string;
    size?: Size;
    loading?: boolean;
    onConfirm?: (e?: MouseEvent) => void;
    onClose?: (e?: MouseEvent) => void;
    onCancel?: (e?: MouseEvent) => void;
}

const Modal: FunctionComponent<ModalProps> = ({ 
    title,
    children,
    isOpen,
    loading,
    cancelText = 'Cancel',
    confirmText = 'Confirm',
    size = 'medium',
    onConfirm,
    onClose,
    onCancel,
}) => {
    return (
        <>
            <CSSTransition
               timeout={250}
               in={isOpen}
               unmountOnExit
               mountOnEnter
               classNames={{
                   enter: styles.modalEnter,
                   enterActive: styles.modalEnterActive,
                   exit: styles.modalExit,
                   exitActive: styles.modalExitActive
               }}
            >
                <div className={`${styles.modal} ${styles[size]}`}>
                    <div className={styles.modalHeader}>
                        <div className={styles.modalAction} />
                        <h2>{title}</h2>
                        <div 
                            onClick={!loading ? onClose : undefined} 
                            className={`${styles.modalAction} ${loading ? styles.actionDisabled : ''}`}
                        >
                            {onClose && (
                                <i className="fas fa-times" />
                            )}
                        </div>
                    </div>
                    <div className={styles.modalBody}>
                        {children}
                    </div>
                    <div className={styles.modalFooter}>
                        {onCancel && (
                            <div className={styles.footerButton}>
                                <Button 
                                    disabled={loading}
                                    fullWidth
                                    variant="classic"
                                    size="medium"
                                    color="#FFC6C6"
                                    label={cancelText}
                                    onClick={onCancel}
                                />
                            </div>
                        )}
                        {onConfirm && (
                            <div className={styles.footerButton}>
                                <Button 
                                    disabled={loading}
                                    fullWidth
                                    variant="classic"
                                    size="medium"
                                    color="#A5FFA5"
                                    label={confirmText}
                                    onClick={onConfirm}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </CSSTransition>
            <Backdrop show={isOpen} zIndex={599} onClick={!loading ? onClose : undefined} />
        </>
    )
}

export default Modal;