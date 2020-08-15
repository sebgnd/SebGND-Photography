import React, { FunctionComponent } from 'react';
import styles from './ErrorMessage.module.css';
import withCentering, { WithCenteringProps } from '../../HOC/withCentering'

interface ErrorMessageProps {
    message: string;
}

const ErrorMessage: FunctionComponent<ErrorMessageProps & WithCenteringProps> = ({ message, centeringClass }) => {
    return (
        <div className={[styles.errorMessageContainer, centeringClass].join(' ')}>
            <i className="fas fa-exclamation-circle" />
            <p>{message}</p>
        </div>
    )
};

export default withCentering(ErrorMessage);