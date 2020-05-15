import Category from "../category/Category";
import ImageBuilder from './ImageBuilder';

const RESOLUTION_TYPES = [
    'full_res',
    'medium_res',
    'small_res',
    'thumbnail_medium',
    'thumbnail_small'
];

export default class Image {
    private _id: number;
    private _category: Category;
    
    private _aperture: string | undefined = undefined;
    private _iso: number | undefined = undefined;
    private _shutterSpeed: string | undefined = undefined;
    private _focalLength: string | undefined = undefined;
    private _uploadDate: Date;

    private _width: number = 0;
    private _height: number = 0;

    constructor(id: number, uploadDate: Date = new Date(), category: Category = new Category()) {
        this._id = id;
        this._uploadDate = uploadDate;
        this._category = category;
    }

    clone(): Image {
        const image: Image = { ...this, uploadDate: new Date(this.uploadDate) };
        return image;
    }

    static format(json: any): Image {
        const uploadDate = new Date(json.uploadDate);
        const imageBuilder = new ImageBuilder(json.id, uploadDate);

        imageBuilder.setAperture(json.aperture)
            .setFocalLength(json.focalLength)
            .setIso(json.iso)
            .setShutterSpeed(json.shutterSpeed);

        if (json.category) {
            const { id, displayName } = json.category;
            const category = new Category(id, displayName);
            imageBuilder.setCategory(category);
        }

        return imageBuilder.build();
    }

    hasExif(): boolean {
        return this.aperture !== null 
            && this.iso !== null 
            && this.shutterSpeed !== null 
            && this.focalLength !== null;
    }

    toExifString(): string {
        if (this.hasExif()) {
            return `ISO: ${this.iso?.toString()}, ${this.shutterSpeed}, ${this.aperture}, ${this.focalLength}`;
        }
        return 'No information'
    }

    getFormatedDate(): string {
        return this.uploadDate.toLocaleDateString('en-us', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    }

    getUrl(resolutionType: string) {
        if (RESOLUTION_TYPES.includes(resolutionType)) {
            return `http://localhost:8000/image/${this.category.id}/${resolutionType}/${this.id}`;
        }
        return `http://localhost:8000/image/${this.category.id}/medium_res/${this.id}`;
    }

    isPortrait(): boolean {
        return true;
    }

    isLandscape(): boolean {
        return true;
    }

    get category(): Category {
        return this._category;
    }

    get id(): number {
        return this._id;
    }

    get uploadDate(): Date {
        return this._uploadDate;
    }

    set aperture(aperture: string | undefined) {
        this._aperture = aperture;
    }

    set iso(iso: number | undefined) {
        this._iso = iso;
    }

    set shutterSpeed(shutterSpeed: string | undefined) {
        this._shutterSpeed = shutterSpeed;
    }

    set focalLength(focalLength: string | undefined) {
        this._focalLength = focalLength;
    } 

    set category(category: Category) {
        this._category = category;
    }
}