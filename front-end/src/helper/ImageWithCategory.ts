import Category from "./Category";
import Image from "./Image";

export default class ImageWithCategory extends Image {
    private _category: Category;

    constructor(id: number, uploadDate: Date, category: Category) {
        super(id, uploadDate);
        this._category = category;
    }

    get category(): Category {
        return this._category;
    }
}