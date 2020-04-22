import React, { Component, createContext, FormEvent } from 'react';
import TextField, { TextFieldEvent } from '../text-field/TextField';

interface IFormProps {
    action: string;
    method: string;
    fields: IField[];
    onSubmit?(): void;
}

interface IFormState {
    values: Map<string, string>;
    errors: Map<string, string | null>;
    submitted: boolean;
}

export interface IFormContext {
    state: IFormState;
    setValue(key: string, value: string): void;
}

export interface IRule {
    maxLength?: number;
    notEmpty?: boolean;
    withoutSpecialCharacters?: boolean;
}

export interface IField {
    id: string;
    fieldType: string;
    rules: IRule;
    sameAs?: string;
    label?: string;
    placeholder?: string;
    hideContent?: boolean;
    required?: boolean;
}

export const FormContext = createContext<IFormContext | undefined>(undefined);

const notEmpty = (content: string): string | null => {
    if (content.trim() === "") {
        return 'This field cannot be empty.';
    }
    return null;
}

const maxLength = (content: string, length: number): string | null => {
    if (content.trim().length > length) {
        return `This field cannot be longer than ${length} characters`;
    }
    return null;
}

const withoutSpecialCharacter = (content: string): string | null => {
    const acceptedCharacters: RegExp = /^[A-Za-z0-9 ]+$/;
    if (!acceptedCharacters.test(content.trim())) {
        return 'This field cannot contain special characters';
    }
    return null;
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

    validate(value: string, rules: IRule): string | null {
        let error: string | null = null;
        if (rules.maxLength) {
            error = maxLength(value, rules.maxLength);
        } else if (rules.notEmpty) {
            error = notEmpty(value);
        } else if (rules.withoutSpecialCharacters) {
            error = withoutSpecialCharacter(value);
        }
        return error;
    }

    handleBlur(event: TextFieldEvent) {
        const { value, name } = event.currentTarget;
        const field: IField | undefined = this.props.fields.find(field => field.id === name);

        if (field) {
            const error: string | null = this.validate(value, field.rules);
            this.setState({ errors: new Map<string, string | null>(this.state.errors).set(name, error) });
        }
    }

    render() {
        const context: IFormContext = {
            state: this.state,
            setValue: this.setValue
        }
        return (
            <FormContext.Provider value={context}>
                <form onSubmit={(e: FormEvent<HTMLFormElement>) => this.handleSubmit(e)} action={this.props.action} method={this.getMethod()}>
                    {this.props.fields.map((field: IField) => {
                        return <TextField key={`${field.id}-input`} errorMessage={this.state.errors.get(field.id)} id={field.id} type={field.fieldType} label={field.label} placeholder={field.placeholder} />
                    })}
                    <button type="submit">Submit</button>
                </form>
            </FormContext.Provider>
        )
    }
}

export default Form;