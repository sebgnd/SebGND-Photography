import React, { FunctionComponent } from 'react';
import styles from './ErrorMessage.module.css';
import withCentering, { WithCenteringProps } from '../../HOC/withCentering'

interface ErrorMessageProps {
    message: string;
    color?: 'default' | 'white' | 'black';
}

const ErrorMessage: FunctionComponent<ErrorMessageProps & WithCenteringProps> = ({ message, color, centeringClass }) => {
    const getColor = () => {
        switch (color) {
            case 'white': return '#FFFFFF';
            case 'black': return '#000000';
            default: return '#858585'
        }
    }

    return (
        <div style={{ color: getColor() }} className={[styles.errorMessageContainer, centeringClass].join(' ')}>
            <i className="fas fa-exclamation-circle" />
            <p>{message}</p>
        </div>
    )
};

export default withCentering(ErrorMessage);