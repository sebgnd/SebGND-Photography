import Image from '../image/Image';
import AbstractGallery from './AbstractGallery';
import Category from '../Category';

export default class GalleryPreview extends AbstractGallery {
    private _thumbnail: Image;

    constructor(category: Category, thumbnail: Image) {
        super(category);
        this._thumbnail = thumbnail;
    }

    get thumbnail(): Image {
        return this._thumbnail;
    }
}