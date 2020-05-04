export class FieldValidator {
    readonly REGULAR_CHAR: RegExp = /^[A-Za-z0-9 ]+$/;

    withoutSpecialCharacter(value: string): boolean {
        if (!this.REGULAR_CHAR.test(value.trim())) {
            return false;
        }
        return true;
    }

    maxLength(value: string, length: number): boolean {
        if (value.trim().length > length) {
            return false;
        }
        return true;
    }

    notEmpty(value: string) {
        if (value.trim() === "") {
            return false;
        }
        return true;
    }

    notEqual(str1: string, str2: string) {
        if (str1.trim() === str2.trim()) {
            return false;
        }
        return true;
    }
}