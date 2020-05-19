const THUMBNAIL_TYPE = ['thumbnail_medium', 'thumbnail_small'];

export default class Category {
    private _id: string;
    private _displayName: string;
    private _thumbnailId: number;

    constructor(id: string = '', displayName: string = '', thumbnailId: number = -1) {
        this._id = id;
        this._displayName = displayName;
        this._thumbnailId = thumbnailId;
    }

    static format(json: any): Category {
        const { id, displayName } = json;
        let thumbnailId = -1;
        if (json.thumbnail.id) {
            thumbnailId = json.thumbnail.id;
        }
        const category = new Category(id, displayName, thumbnailId);
        return category;
    }

    getThumbnailUrl(type: string): string {
        if (this._thumbnailId !== -1) {
            if (THUMBNAIL_TYPE.includes(type)) {
                return `http://localhost:8000/image/${this.id}/${type}/${this.thumbnailId}`;
            }
            return `http://localhost:8000/image/${this.id}/thumbnail_medium/${this.thumbnailId}`;
        }
        return 'https://via.placeholder.com/450';
    }

    clone(): Category {
        return { ...this };
    }

    get thumbnailId() {
        return this._thumbnailId;
    }

    get id() {
        return this._id;
    }

    get displayName() {
        return this._displayName;
    }
}