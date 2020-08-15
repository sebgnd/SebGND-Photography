import React, { FunctionComponent, FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import style from './Contact.module.css';

import SocialMedia from './SocialMedia/SocialMedia';
import Separator from '../../UI/Separator/Separator';
import ContactForm from './ContactForm/ContactForm';

import Validation, { withoutSpecialCharacter, notEmpty, maxLength, ValidationResponse } from '../../../helper/form/Validation';
import FormField from '../../../helper/form/FormField';
import FieldValidator from '../../../helper/form/FieldValidator';

import { postContactMessage } from '../../../redux/slices/contactSlice';
import { selectContactStatus } from '../../../redux/selectors/contactSelector';

interface ContactInput {
    name: FormField;
    message: FormField;
    [key: string]: FormField;
}

const Contact: FunctionComponent = () => {
    const [contactInput, setContactInput] = useState<ContactInput>(() => {
        const nameValidations: Validation[] = [
            { rule: notEmpty },
            { rule: withoutSpecialCharacter }, 
            { rule: maxLength, params: [25] }
        ];
        const messageValidations = [{ rule: notEmpty }];

        return {
            name: {
                value: '',
                error: null,
                name: 'name',
                validations: nameValidations
            },
            message: {
                value: '',
                error: null,
                name: 'message',
                validations: messageValidations   
            }
        };
    });
    const dispatch = useDispatch();
    const status = useSelector(selectContactStatus);

    const handleChange = (event: FormEvent<HTMLInputElement>) => {
        const { currentTarget } = event;
        const { value, name } = currentTarget;

        setContactInput((prevContactInput: ContactInput) => {
            return {
                ...prevContactInput,
                [name]: { 
                    ...prevContactInput[name],
                    value
                }
            }
        })
    }

    const getInputResettedErrors = () => {
        const newContactInput = { ...contactInput };
        const inputKeys = Object.keys(newContactInput);

        inputKeys.forEach((key: string) => {
            newContactInput[key].error = null;
        });

        return newContactInput;
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const fields: FormField[] = Object.keys(contactInput).map(key => {
            return contactInput[key];
        })
        const validator = new FieldValidator(fields);
        const errors: Map<string, ValidationResponse> = validator.validate();
        const hasErrors = errors.size !== 0;

        if (hasErrors) {
            const newContactInput = getInputResettedErrors();

            errors.forEach((error: ValidationResponse, input: string) => {
                newContactInput[input].error = error.message;
            });
            
            setContactInput(newContactInput);
        } else {
            const message = contactInput.message.value;
            const name = contactInput.name.value;

            dispatch(
                postContactMessage({ 
                    message, 
                    name 
                })
            );
        }
    }

    return (
        <div className={style.contactContainer}>
            <SocialMedia />
            <Separator size="tiny" orientation="horizontal"/>
            <ContactForm 
                onChange={handleChange}
                onSubmit={handleSubmit}
                nameField={contactInput.name}
                messageField={contactInput.message}
                status={status}
            />
        </div>
    )

}

export default Contact;