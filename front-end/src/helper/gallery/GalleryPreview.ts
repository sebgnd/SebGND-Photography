import Image from '../image/Image';
import AbstractGallery from './AbstractGallery';
import Category from '../Category';

export default class GalleryPreview extends AbstractGallery {
    private _thumbnail: Image;

    constructor(category: Category, thumbnail: Image) {
        super(category);
        this._thumbnail = thumbnail;
    }

    static format(json: any): GalleryPreview {
        // TODO: Implement checking json format => throw wrong format error
        const { id, displayName } = json;
        const { id: thumbnailId, uploadDate } = json.thumbnail;
        const category = new Category(id, displayName);
        const thumbnail = new Image(thumbnailId, new Date(uploadDate));
        return new GalleryPreview(category, thumbnail);
    }

    get thumbnail(): Image {
        return this._thumbnail;
    }
}