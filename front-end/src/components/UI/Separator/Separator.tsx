import React, { FunctionComponent } from 'react';
import style from './Separator.module.css';

interface SeparatorProp {
    size: string;
    orientation?: string;
}

const Separator: FunctionComponent<SeparatorProp> = ({ size, orientation = 'horizontal' }) => {
    const orientations = ['vertical', 'horizontal'];
    const sizes = ['small', 'medium', 'big', 'tiny'];
    const separatorClasses = [style.separator];

    const classes: any = {
        horizontal: {
            tiny: 'tinyWidth',
            small: 'smallWidth',
            medium: 'mediumWidth',
            big: 'bigWidth'
        },
        vertical: {
            tiny: 'tinyHeight',
            small: 'smallHeight',
            medium: 'mediumHeight',
            big: 'bigHeight'
        }
    }

    if (sizes.includes(size) && orientations.includes(orientation)) {
        const styleClass = classes[orientation][size];
        separatorClasses.push(style[styleClass]);
    } else {
        separatorClasses.push(style.mediumWidth);
    }

    return (
        <div className={separatorClasses.join(' ')} />
    )
}

export default Separator;