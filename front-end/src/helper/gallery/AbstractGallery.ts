import Image from '../image/Image';
import Category from '../Category';

export default abstract class AbstractGallery {
    private _category: Category;
    
    constructor(category: Category) {
        this._category = category;
    }

    get category(): Category {
        return this._category;
    }

    get displayName(): string {
        return this._category.displayName;
    }
}