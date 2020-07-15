import Image from '../image/Image';
import Category from './Category';

export default class CategoryThumbnail {

    private readonly THUMBNAIL_TYPE = ['thumbnail_medium', 'thumbnail_small'];

    private _image: Image | null;
    private _category: Category;

    constructor(image: Image, category: Category) {
        this._image = image;
        this._category = category;
    }

    static format(json: any): CategoryThumbnail {
        const { image: thumbnailImage } = json.thumbnail;
        const category = new Category(json.id, json.displayName);
        const image = new Image(thumbnailImage.id, thumbnailImage.width, thumbnailImage.height, category, new Date(thumbnailImage.uploadDate));

        return new CategoryThumbnail(image, category);
    }

    getUrl(type: string): string {
        if (this.image) {
            if (this.THUMBNAIL_TYPE.includes(type)) {
                return `http://localhost:8000/file/image/${type}/${this.image.id}`;
            }
            return `http://localhost:8000/image/file/thumbnail_medium/${this.image.id}`;
        }
        return 'https://via.placeholder.com/450';
    }

    get image() {
        return this._image;
    }

    get category() {
        return this._category;
    }
}