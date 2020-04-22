// Style
import { StyledInput } from './text-input-style';
import { StyledTextArea } from './text-area-style';
import { Margin, MarginTop, Block, MarginLeft } from '../../regular/style';

// Date / Logic
import React, { Component, FormEvent } from 'react';
import { IFormContext, FormContext } from '../form/Form';

export const TYPES = ['textinput', 'textarea'];

interface IFieldProp {
    id: string;
    type: string;
    label?: string;
    placeholder?: string;
    errorMessage?: string;
    hideContent?: boolean;
    required?: boolean;
}

type GenericFormEvent = FormEvent<HTMLInputElement> | FormEvent<HTMLTextAreaElement>;

class Field extends Component<IFieldProp, {}> {
    getTextType() {
        return this.props.hideContent ? 'password' : 'text';
    }

    getFieldType() {
        return TYPES.includes(this.props.type) ? this.props.type : TYPES[0];
    }

    handleChange(event: GenericFormEvent, context?: IFormContext) {
        const { id } = this.props;
        const value = event.currentTarget.value;
        context?.setValue(id, value);
    }

    render() {
        const { id, label, placeholder } = this.props;
        const error = false;
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
                                {type === TYPES[0] && (
                                    <StyledInput id={id} error={error} placeholder={placeholder} type={this.getTextType()} onChange={(e: FormEvent<HTMLInputElement>) => this.handleChange(e, context)}/>
                                )}
                                {type === TYPES[1] && (
                                    <StyledTextArea id={id} error={error} placeholder={placeholder} onChange={(e: FormEvent<HTMLTextAreaElement>) => this.handleChange(e, context)}/>
                                )}
                            </MarginTop>
                        </Margin>
                    </Block>
                )}
            </FormContext.Consumer>
        )
    }
} 

export default Field;