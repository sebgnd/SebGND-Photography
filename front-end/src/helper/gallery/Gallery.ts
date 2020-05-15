import Category from "../category/Category";
import Image from "../image/Image";

export default class Gallery {
    private _category: Category;
    private _thumbnail: Image;
    private _images: Image[] = [];

    constructor(category: Category = new Category(), thumbnail: Image = new Image()) {
        this._category = category;
        this._thumbnail = thumbnail;
    }

    static format(json: any) {
        const category = Category.format(json);
        const thumbnail = Image.format(json.thumbnail);
        return new Gallery(category, thumbnail);
    }

    // All image in a gallery must have the same category as the gallery
    add(image: Image) {
        if (image.category.id !== this._category.id) {
            throw new Error('Cannot add an image with a different category to this gallery');
        }
        this._images.push(image);
    }

    remove(id: number) {
        this._images = this._images.filter((image: Image) => image.id !== id);
    }

    set images(images: Image[]) {
        const originalSize = images.length;
        const filteredSize = images.filter((image: Image) => image.category.id === this._category.id).length;
        if (originalSize === filteredSize) {
            this._images = images;
        } else {
            throw new Error('At least one image is not the same cateogory as the gallery');
        }
    }

    get category(): Category {
        return this._category;
    }

    get images(): Image[] {
        return this._images;
    }
}