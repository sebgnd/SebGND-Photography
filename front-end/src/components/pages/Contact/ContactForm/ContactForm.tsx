import React, { FunctionComponent, FormEvent } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import style from './ContactForm.module.css';

import { TextField } from '../../../UI/Form';
import { Button } from '../../../UI/Button';
import Spinner from '../../../UI/Spinner/Spinner';
import ErrorMessage from '../../../UI/ErrorMessage/ErrorMessage';

import FormField from '../../../../helper/form/FormField';

interface FormProps {
    nameField: FormField;
    messageField: FormField;
    status: string;
    onChange: (event: FormEvent<HTMLInputElement>) => void;
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

const ContactForm: FunctionComponent<FormProps & RouteComponentProps> = ({ nameField, messageField, history, status, onChange, onSubmit }) => {
    return (
        <div className={style.contactFormContainer}>
            {status === 'success' ? (
                <>
                    <h2>Thank you for your message</h2>
                    <Button variant="classic" size="medium" label="Return home" to="/" />
                </>
            ) : (
                <>
                    {status === 'submitting' ? (
                        <div className={style.infoContainer}>
                            <Spinner centerHorizontal size="small" />
                        </div>
                    ) : (
                        status === 'failed' ? (
                            <div className={style.infoContainer}>
                                <ErrorMessage message="The message couldn't be sent" centerHorizontal />
                                <Button variant="classic" size="medium" label="Return home" to="/" />
                            </div>
                        ) : (
                            <>
                                <h2>Send me a message!</h2>
                                <form className={style.contactForm} id="contactForm" onSubmit={onSubmit}>
                                    <TextField 
                                        hasError={nameField.error !== null}
                                        errorMessage={nameField.error}
                                        name="name" 
                                        inputType="text-input"
                                        placeholder="Your name ..." 
                                        onChange={(event: FormEvent<HTMLInputElement>) => onChange(event)} 
                                    />
                                    <TextField 
                                        hasError={messageField.error !== null}
                                        errorMessage={messageField.error}
                                        name="message"
                                        inputType="text-area" 
                                        placeholder="Your message ..." 
                                        form="contactForm" 
                                        onChange={(event: FormEvent<HTMLInputElement>) => onChange(event)} 
                                    />
                                    <div className={style.submitContainer}>
                                        <Button variant="classic" size="medium" label="Send" type="submit" />
                                    </div>
                                </form>
                            </>
                        )
                    )}
                </>
            )}
        </div>
    )
}

export default withRouter(ContactForm);