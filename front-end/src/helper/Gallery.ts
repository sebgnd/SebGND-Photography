import Image from './Image';

export default class Gallery {
    private _id: string;
    private _displayName: string;
    private _thumbnail: Image;
    private _images: Image[] = [];

    constructor(id: string = 'gallery', displayName: string = 'Gallery', thumbnail: Image = new Image()) {
        this._id = id;
        this._displayName = displayName;
        this._thumbnail = thumbnail;
    }

    static format(galleryJson: any): Gallery {
        const { id: galleryId, displayName } = galleryJson;
        let thumbnail = new Image();
        if (galleryJson.thumbnail) {
            const { id: thumbnailId, uploadDate, isThumbnail } = galleryJson.thumbnail;
            thumbnail = new Image(thumbnailId, galleryId, new Date(uploadDate), isThumbnail);
        }
        return new Gallery(galleryId, displayName, thumbnail);
    }

    clone(): Gallery {
        const newGallery: Gallery = new Gallery(this.id, this.displayName, this.thumbnail.clone());
        this.images.forEach(image => {
            newGallery.addImage(image);
        });
        return newGallery;
    }

    addImage(image: Image) {
        this.images.push(image);
    }

    get images(): Image[] {
        return this._images;
    }

    get thumbnail(): Image {
        return this._thumbnail;
    }

    get displayName(): string {
        return this._displayName;
    }

    get id(): string {
        return this._id;
    }
}