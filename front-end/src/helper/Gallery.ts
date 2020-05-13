import Image from './Image';

export default class Gallery {
    private id: string;
    private displayName: string;
    private thumbnail: Image;
    private images: Image[] = [];

    constructor(id: string = 'gallery', displayName: string = 'Gallery', thumbnail: Image = new Image()) {
        this.id = id;
        this.displayName = displayName;
        this.thumbnail = thumbnail;
    }

    getImages() {
        return this.images;
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
     
    clone() {
        const newGallery: Gallery = new Gallery(this.id, this.displayName, this.thumbnail.clone());
        this.images.forEach(image => {
            newGallery.addImage(image);
        });
        return newGallery;
    }
}