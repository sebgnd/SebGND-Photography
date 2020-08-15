import React, { FunctionComponent, FormEvent } from 'react';
import style from './ContactForm.module.css';

import { TextField } from '../../../UI/Form';
import { Button } from '../../../UI/Button';

import FormField from '../../../../helper/form/FormField';

interface FormProps {
    nameField: FormField;
    messageField: FormField;
    status: string;
    onChange: (event: FormEvent<HTMLInputElement>) => void;
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

const ContactForm: FunctionComponent<FormProps> = ({ nameField, messageField, onChange, onSubmit }) => {
    return (
        <div className={style.contactFormContainer}>
            <h2>Send me a message!</h2>
            <form className={style.contactForm} id="contactForm" onSubmit={onSubmit}>
                <TextField 
                    hasError={nameField.error !== null}
                    errorMessage={nameField.error}
                    id="name" 
                    inputType="text-input"
                    placeholder="Your name ..." 
                    onChange={(event: FormEvent<HTMLInputElement>) => onChange(event)} 
                />
                <TextField 
                    hasError={messageField.error !== null}
                    errorMessage={messageField.error}
                    id="message"
                    inputType="text-area" 
                    placeholder="Your message ..." 
                    form="contactForm" 
                    onChange={(event: FormEvent<HTMLInputElement>) => onChange(event)} 
                />
                <div className={style.submitContainer}>
                    <Button variant="classic" size="medium" label="Send" type="submit" />
                </div>
            </form>
        </div>
    )
}

export default ContactForm;