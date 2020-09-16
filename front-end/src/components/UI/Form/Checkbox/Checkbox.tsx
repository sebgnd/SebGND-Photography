import React, { FunctionComponent, FormEvent, ChangeEvent } from 'react';

interface CheckboxProps {
    id: string;
    name: string;
    form?: string;
    label?: string;
    labelPosition?: 'vertical' | 'horizontal'; 
    checked?: boolean;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (event: FormEvent<HTMLInputElement>) => void;
}

const Checkbox: FunctionComponent<CheckboxProps> = ({
    id,
    name,
    label = '',
    labelPosition = 'horizontal',
    checked,
    form,
    onChange,
    onBlur
}) => {
    return (
        <input 
            id={id}
            name={name}
            form={form}
            checked={checked} 
            onChange={onChange}
            onBlur={onBlur} 
        />
    )
}

export default Checkbox;