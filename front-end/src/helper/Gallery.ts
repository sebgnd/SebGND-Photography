import Image from './Image';

export default class Gallery {
    private id: string;
    private displayName: string;
    private thumbnail: Image;

    constructor(id: string = '', displayName: string = '', thumbnail: Image = new Image()) {
        this.id = id;
        this.displayName = displayName;
        this.thumbnail = thumbnail;
    }

    getThumbnail() {
        return this.thumbnail;
    }

    getDisplayName() {
        return this.displayName;
    }

    getId() {
        return this.id;
    }
}