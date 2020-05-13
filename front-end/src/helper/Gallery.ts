import Image from './Image';

export default class Gallery {
    private id: string;
    private displayName: string;
    private thumbnail: Image;
    private images: Image[] = [];

    constructor(id: string, displayName: string, thumbnail: Image) {
        this.id = id;
        this.displayName = displayName;
        this.thumbnail = thumbnail;
    }

    addImage(image: Image) {
        this.images.push(image);
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