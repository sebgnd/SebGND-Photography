import Validation from './Validation';

export default interface FormField {
    value: string;
    error: string | null;
    name: string;
    validations?: Validation[];
}