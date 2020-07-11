const THUMBNAIL_TYPE = ['thumbnail_medium', 'thumbnail_small'];

export default class Category {
    private _id: string;
    private _displayName: string;

    constructor(id: string = '', displayName: string = '') {
        this._id = id;
        this._displayName = displayName;
    }

    static format(json: any): Category {
        const { id, displayName } = json;
        let thumbnailId = -1;
        if (json.thumbnail.id) {
            thumbnailId = json.thumbnail.id;
        }
        const category = new Category(id, displayName);
        return category;
    }

    clone(): Category {
        return { ...this };
    }

    get id() {
        return this._id;
    }

    get displayName() {
        return this._displayName;
    }
}