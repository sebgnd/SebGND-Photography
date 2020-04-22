// Style
import { StyledInput } from './text-input-style';
import { StyledTextArea } from './text-area-style';
import { Margin, MarginTop, Block, MarginLeft } from '../../regular/style';

// Date / Logic
import React, { Component, FormEvent } from 'react';
import { IFormContext, FormContext } from '../form/Form';

export const TYPES = ['textinput', 'textarea'];

interface ITextFieldProp {
    id: string;
    type: string;
    onBlur?(e: TextFieldEvent): void;
    onChange?(e: TextFieldEvent): void;
    label?: string;
    placeholder?: string;
    hideContent?: boolean;
    required?: boolean;
    errorMessage?: string | null;
}

export type TextFieldEvent = FormEvent<HTMLInputElement> | FormEvent<HTMLTextAreaElement>;

class TextField extends Component<ITextFieldProp, {}> {
    getTextType() {
        return this.props.hideContent ? 'password' : 'text';
    }

    getFieldType() {
        return TYPES.includes(this.props.type) ? this.props.type : TYPES[0];
    }

    handleBlur(event: TextFieldEvent) {
        if (this.props.onBlur) {
            this.props.onBlur(event);
        }
    }

    handleChange(event: TextFieldEvent, context?: IFormContext) {
        const { id } = this.props;
        const value = event.currentTarget.value;
        context?.setValue(id, value);

        if (this.props.onChange) {
            this.props.onChange(event);
        }
    }

    render() {
        const { id, label, placeholder } = this.props;
        const error = this.props.errorMessage !== null;
        const type = this.getFieldType();

        return (
            <FormContext.Consumer>
                {(context?: IFormContext) => (
                    <Block>
                        <Margin amount={10}>
                            {label && (
                                <MarginLeft amount={5}>
                                    <label htmlFor={id}>{label}</label>
                                </MarginLeft>
                            )}
                            <MarginTop amount={5}>
                                {this.getFieldType() === TYPES[0] && (
                                    <StyledInput 
                                        name={id} 
                                        id={id} 
                                        error={error} 
                                        placeholder={placeholder} 
                                        type={this.getTextType()} 
                                        onBlur={(e: FormEvent<HTMLInputElement>) => this.handleBlur(e)} 
                                        onChange={(e: FormEvent<HTMLInputElement>) => this.handleChange(e, context)}/>
                                )}
                                {this.getFieldType() === TYPES[1] && (
                                    <StyledTextArea 
                                        name={id} 
                                        id={id} 
                                        error={error} 
                                        placeholder={placeholder} 
                                        onBlur={(e: FormEvent<HTMLTextAreaElement>) => this.handleBlur(e)}
                                        onChange={(e: FormEvent<HTMLTextAreaElement>) => this.handleChange(e, context)}/>
                                )}
                            </MarginTop>
                        </Margin>
                    </Block>
                )}
            </FormContext.Consumer>
        )
    }
} 

export default TextField;