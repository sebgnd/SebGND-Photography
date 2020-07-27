import { has } from "lodash";

const REGULAR_CHAR: RegExp = /^[A-Za-z0-9 ]+$/;
const EMAIL: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default interface Validation {
    rule: Function;
    params?: any[];
}

export interface ValidationResponse {
    hasError: boolean;
    message: string | null;
}

export const withoutSpecialCharacter = (value: string): ValidationResponse => {
    const hasError = !REGULAR_CHAR.test(value.trim())
    return {
        hasError,
        message: hasError ? 'Cannot have special characters.' : null
    };
}

export const maxLength = (value: string, length: number): ValidationResponse => {
    const hasError =  value.trim().length > length
    return {
        hasError,
        message: hasError ? `Cannot exceed ${length} characters.` : null
    }
}

export const notEmpty = (value: string): ValidationResponse => {
    const hasError = value.trim() === "";
    return {
        hasError,
        message: hasError ? 'Cannot be empty.' : null
    }
}

export const notEqual = (str1: string, str2: string): ValidationResponse => {
    const hasError = str1.trim() === str2.trim();
    return {
        hasError,
        message: hasError ? 'Cannot be equal.' : null
    }
}