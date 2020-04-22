import React, { Component, createContext, FormEvent } from 'react';

interface IFormProps {
    action: string;
    method: string;
    onSubmit(): void;
}

interface IFormState {
    values: Map<string, string>;
    errors: Map<string, string>;
    submitted: boolean;
}

export interface IFormContext {
    state: IFormState;
    setValue(key: string, value: string): void;
}

export interface IRule {
    maxLength?: number;
    notEmpty?: boolean;
    withSpecialCharacters?: boolean;
}

export interface IField {
    id: string;
    fieldType: string;
    rules: IRule;
    sameAs?: string;
    label?: string;
    placeholder?: string;
    errorMessage?: string;
    hideContent?: boolean;
    required?: boolean;
}

export const FormContext = createContext<IFormContext | undefined>(undefined);

const notEmpty = (content: string) => {
    return content.trim() !== "";
}

const maxLength = (content: string, length: number) => {
    return content.trim().length <= length;
}

const withoutSpecialCharacter = (content: string) => {
    const acceptedCharacters: RegExp = /^[A-Za-z0-9 ]+$/;
    return acceptedCharacters.test(content.trim());
}

class Form extends Component<IFormProps, IFormState> {
    constructor(props: IFormProps) {
        super(props);
        this.state = {
            values: new Map<string, string>(),
            submitted: false,
            errors: new Map<string, string>()
        };
        this.setValue = this.setValue.bind(this);
    }

    getMethod() {
        const { method } = this.props;
        if (method.toLowerCase() == 'post' || method.toLowerCase() == 'get') {
            return method.toUpperCase();
        }
        return 'POST';
    }

    setValue(key: string, value: string) {
        this.setState({ values: new Map<string, string>(this.state.values).set(key, value) });
    }

    handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
    }

    render() {
        const context: IFormContext = {
            state: this.state,
            setValue: this.setValue
        }
        return (
            <FormContext.Provider value={context}>
                <form onSubmit={(e: FormEvent<HTMLFormElement>) => this.handleSubmit(e)} action={this.props.action} method={this.getMethod()}>
                    {this.props.children}
                    <button type="submit">Submit</button>
                </form>
            </FormContext.Provider>
        )
    }
}

export default Form;