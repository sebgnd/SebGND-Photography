export default class BuilderError extends Error {
    constructor(mandatoryProperties: string[]) {
        let message = "You need to set these properties:";
        
        mandatoryProperties.forEach((property: string, index: number) => {
            message += ` ${property}`;
            if (index !== mandatoryProperties.length - 1) {
                message += ',';
            }
        })
        super(message);
    }
}