import React, { FunctionComponent } from 'react';
import style from './Separator.module.css';

interface SeparatorProp {
    size: string;
}

const Separator: FunctionComponent<SeparatorProp> = ({ size }) => {
    const sizes = ['small', 'medium', 'big'];
    const separatorClasses = [style.separator];

    if (sizes.includes(size)) {
        separatorClasses.push(style[size]);
    } else {
        separatorClasses.push(style.medium);
    }

    return (
        <div className={separatorClasses.join(' ')} />
    )
}

export default Separator;