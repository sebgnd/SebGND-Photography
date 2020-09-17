import React, { FunctionComponent, FormEvent, ChangeEvent } from 'react';
import styles from './Checkbox.module.css';

interface CheckboxProps {
    id?: string;
    name: string;
    label?: string;
    checked?: boolean;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (event: FormEvent<HTMLInputElement>) => void;
}

const Checkbox: FunctionComponent<CheckboxProps> = ({
    id,
    name,
    label = '',
    checked,
    onChange,
    onBlur
}) => {
    return (
        <div className={styles.checkbox}>
            <input 
                type="checkbox"
                id={id || name}
                name={name}
                checked={checked} 
                onChange={onChange}
                onBlur={onBlur} 
            />
            {label && (
                <label className={styles.checkboxLabel}>
                    <p>{label}</p>
                </label>
            )}
        </div>
    )
}

export default Checkbox;