import Image from './Image';

export default class Gallery {
    private id: string;
    private displayName: string;
    private thumbnail?: Image;

    constructor(id: string, displayName: string) {
        this.id = id;
        this.displayName = displayName;
    }

    setThumbnail(thumbnail: Image) {
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