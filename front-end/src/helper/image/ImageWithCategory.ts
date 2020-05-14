import Category from "../Category";
import Image from "./Image";

export default class ImageWithCategory extends Image {
    private _category: Category;

    constructor(id: number, uploadDate: Date, category: Category) {
        super(id, uploadDate);
        this._category = category;
    }

    static format(json: any): ImageWithCategory {
        const { id, uploadDate } = json;
        const { id: categoryId, displayName } = json.category;
        const category = new Category(categoryId, displayName);
        return new ImageWithCategory(id, new Date(uploadDate), category);
    }

    get category(): Category {
        return this._category;
    }
}