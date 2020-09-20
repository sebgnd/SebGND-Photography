import React, { FunctionComponent } from 'react';
import styles from './InformationMessage.module.css';
import withCentering, { WithCenteringProps } from '../../HOC/withCentering'

interface InformationMessageProps {
    message: string;
    messageType: 'error' | 'information';
    color?: 'default' | 'white' | 'black';
}

interface IconMap {
    [key: string]: string;
}

const ErrorMessage: FunctionComponent<InformationMessageProps & WithCenteringProps> = ({ 
    message, 
    color, 
    messageType,
    centeringClass 
}) => {
    const icons: IconMap = {
        error: 'exclamation-circle',
        information: 'info-circle'
    };

    const getColor = () => {
        switch (color) {
            case 'white': return '#FFFFFF';
            case 'black': return '#000000';
            default: return '#858585'
        }
    }

    return (
        <div style={{ color: getColor() }} className={[styles.informationMessageContainer, centeringClass].join(' ')}>
            <i className={`fas fa-${icons[messageType]}`} />
            <p>{message}</p>
        </div>
    )
};

export default withCentering(ErrorMessage);