// Style
import { StyledInput, StyledTextArea, TextFieldContainer, LabelContainer } from './text-field-style';
import { Label } from '../label/Label';

// Date / Logic
import React, { Component, FormEvent, Fragment } from 'react';

const TYPES: string[] = ['text-input', 'text-area'];

type TextFieldEvent = FormEvent<HTMLInputElement> | FormEvent<HTMLTextAreaElement>

interface ITextFieldProps {
    id: string;
    type: string;
    error?: boolean;
    onBlur?(e: TextFieldEvent): void;
    onChange?(e: TextFieldEvent): void;
    label?: string;
    placeholder?: string;
    hideContent?: boolean;
    required?: boolean;
    errorMessage?: string;
}

class TextField extends Component<ITextFieldProps, {}> {
    getFieldType() {
        if (TYPES.includes(this.props.type)) {
            return this.props.type;
        }
        return TYPES[0];
    }

    handleBlur(event: TextFieldEvent) {
        if (this.props.onBlur) {
            this.props.onBlur(event);
        }
    }

    handleChange(event: TextFieldEvent) {
        if (this.props.onChange) {
            this.props.onChange(event);
        }
    }

    render() {
        const { id, label, placeholder, hideContent, error } = this.props;
        return (
                <TextFieldContainer>
                        {label && (
                            <LabelContainer>
                                <Label htmlFor={id}>{label}</Label>
                            </LabelContainer>
                        )}
                        {this.getFieldType() === TYPES[0] && (
                            <StyledInput 
                                name={id} 
                                id={id} 
                                error={error ? error : false} 
                                placeholder={placeholder} 
                                type={hideContent ? "password" : "text"} 
                                onBlur={(e: FormEvent<HTMLInputElement>) => this.handleBlur(e)} 
                                onChange={(e: FormEvent<HTMLInputElement>) => this.handleChange(e)}/>
                        )}
                        {this.getFieldType() === TYPES[1] && (
                            <StyledTextArea 
                                name={id} 
                                id={id} 
                                error={error ? error : false} 
                                placeholder={placeholder} 
                                onBlur={(e: FormEvent<HTMLTextAreaElement>) => this.handleBlur(e)}
                                onChange={(e: FormEvent<HTMLTextAreaElement>) => this.handleChange(e)}/>
                        )}
                </TextFieldContainer>
            )
    }
} 

export default TextField;