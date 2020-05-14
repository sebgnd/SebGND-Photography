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

    static format(json: any): Gallery {
        // TODO: Implement checking json format => throw wrong format error
        const { id, displayName } = json;
        const category = new Category(id, displayName);
        const images = json.images.map((image: any) => new Image(image.id, new Date(image.uploadDate)));
        return new Gallery(category, images);
    }

    add(image: Image) {
        this._images.push(image);
    }

    delete(imgId: number) {
        this._images = this._images.filter((image: Image) => image.id !== imgId);
    }
}