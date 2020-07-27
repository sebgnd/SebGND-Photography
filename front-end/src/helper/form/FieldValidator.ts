import FormField from './FormField';
import Validation, { ValidationResponse } from './Validation';

export default class FieldValidator {
    private fields: FormField[];

    constructor(fields: FormField[]) {
        this.fields = fields;
    }

    public validate(): Map<string, ValidationResponse> {
        const errors = new Map<string, ValidationResponse>();

        this.fields.forEach((field: FormField) => {
            if (field.validations && field.validations.length) {
                const fieldError = this.validateField(field);
                const fieldName = field.name;

                if (fieldError && fieldError.hasError) {
                    errors.set(fieldName, fieldError);
                }
            }
        })
        return errors;
    }

    public validateField(field: FormField): ValidationResponse | null {
        const { validations, value, name } = field;
        const length = validations?.length;

        if (length && validations) {
            for (let i = 0; i < length; i++) {
                let validationResponse: ValidationResponse;
                const { rule, params } = validations[i];

                if (params) {
                    validationResponse = rule(value, [...params]);
                } else {
                    validationResponse = rule(value);
                }
                if (validationResponse.hasError) {
                    return validationResponse;
                }
            }
        }
        return null;
    }

    public allCorrect(): boolean {
        const hasErrors = this.validate();
        return !hasErrors;
    }
}