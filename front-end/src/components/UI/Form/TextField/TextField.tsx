// Style
import { StyledInput, StyledTextArea, TextFieldContainer, LabelContainer, ErrorContainer, LabelErrorContainer } from './text-field-style';
import { Label } from '../Label/Label';

// Date / Logic
import React, { FunctionComponent, FormEvent, Fragment } from 'react';

const TYPES: string[] = ['text-input', 'text-area'];

type TextFieldEvent = FormEvent<HTMLInputElement> | FormEvent<HTMLTextAreaElement>

interface TextFieldProps {
    id: string;
    inputType: string;
    value?: string;
    hasError?: boolean;
    onBlur?(e: TextFieldEvent): void;
    onChange?(e: TextFieldEvent): void;
    label?: string;
    placeholder?: string;
    hideContent?: boolean;
    required?: boolean;
    errorMessage?: string | null | undefined;
    form?: string;
}

const TextField: FunctionComponent<TextFieldProps> = (props) => {
    const { id, label, placeholder, hideContent, hasError, onBlur, onChange, inputType, errorMessage } = props;

    const getFieldType = () => {
        if (TYPES.includes(inputType)) {
            return inputType;
        }
        return TYPES[0];
    }

    return (
        <TextFieldContainer>
            <LabelErrorContainer>
                {label && (
                    <LabelContainer>
                        <Label htmlFor={id}>{label}</Label>
                    </LabelContainer>
                )}
                {hasError && (
                    <ErrorContainer>{errorMessage}</ErrorContainer>
                )}
            </LabelErrorContainer>
            {getFieldType() === TYPES[0] && (
                <StyledInput 
                    name={id} 
                    id={id} 
                    error={hasError ? hasError : false} 
                    placeholder={placeholder} 
                    type={hideContent ? "password" : "text"} 
                    onBlur={onBlur} 
                    onChange={onChange}/>
            )}
            {getFieldType() === TYPES[1] && (
                <StyledTextArea 
                    name={id} 
                    id={id} 
                    error={hasError ? hasError : false} 
                    placeholder={placeholder} 
                    onBlur={onBlur}
                    onChange={onChange}/>
            )}
        </TextFieldContainer>
    )
} 

export default TextField;