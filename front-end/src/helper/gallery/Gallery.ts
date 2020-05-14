import AbstractGallery from './AbstractGallery';
import Category from '../Category';
import Image from '../image/Image';

export default class Gallery extends AbstractGallery {
    private _images: Image[];

    constructor(category: Category, images: Image[] = []) {
        super(category);
        this._images = images;
    }

    get images(): Image[] {
        return this._images;
    }

    add(image: Image) {
        this._images.push(image);
    }

    delete(imgId: number) {
        this._images = this._images.filter((image: Image) => image.id !== imgId);
    }
}