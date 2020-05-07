export default class Gallery {
    private id: string;
    private displayName: string;

    constructor(id: string, displayName: string) {
        this.id = id;
        this.displayName = displayName;
    }

    getDisplayName() {
        return this.displayName;
    }

    getId() {
        return this.id;
    }
}