import Image from '../image/Image';
import AbstractGallery from './AbstractGallery';
import Category from '../Category';

export default class GalleryThumbnail extends AbstractGallery {
    private _image: Image;

    constructor(category: Category, image: Image) {
        super(category);
        this._image = image;
    }

    static format(json: any): GalleryThumbnail {
        // TODO: Implement checking json format => throw wrong format error
        const { id, displayName } = json;
        const { id: thumbnailId, uploadDate } = json.thumbnail;
        const category = new Category(id, displayName);
        const thumbnail = new Image(thumbnailId, new Date(uploadDate));
        return new GalleryThumbnail(category, thumbnail);
    }

    get id(): string {
        return this.category.id;
    }

    get image(): Image {
        return this._image;
    }
}