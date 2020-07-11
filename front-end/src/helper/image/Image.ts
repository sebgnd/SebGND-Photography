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
    
    private _aperture: string | null;
    private _iso: number | null;
    private _shutterSpeed: string | null;
    private _focalLength: string | null;
    private _uploadDate: Date;

    private _width: number = 0;
    private _height: number = 0;

    constructor(id: number, category: Category, uploadDate: Date) {
        this._id = id;
        this._uploadDate = uploadDate;
        this._category = category;

        this._aperture = null;
        this._iso = null;
        this._shutterSpeed = null;
        this._focalLength = null;
        this._width = 0;
        this._height = 0;
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
            .setShutterSpeed(json.shutterSpeed)
            .setHeight(json.height)
            .setWidth(json.width);

        if (json.category) {
            const { id, displayName } = json.category;
            const category = new Category(id, displayName);
            imageBuilder.setCategory(category);
        }

        return imageBuilder.build();
    }

    hasExif(): boolean {
        return this._aperture !== null 
            && this._iso !== null 
            && this._shutterSpeed !== null 
            && this._focalLength !== null;
    }

    toExifString(): string {
        if (this.hasExif()) {
            return `ISO: ${this._iso?.toString()}, ${this._shutterSpeed}, ${this._aperture}, ${this._focalLength}`;
        }
        return 'No information.'
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
            return `http://localhost:8000/file/image/${resolutionType}/${this.id}`;
        }
        return `http://localhost:8000/file/image/medium_res/${this.id}`;
    }

    isPortrait(): boolean {
        return this._height > this._width;
    }

    isLandscape(): boolean {
        return this._width > this._height;
    }

    getImageType(): string {
        if (this.isPortrait()) {
            return 'portrait';
        }
        return 'landscape';
    }

    // Getters

    get category(): Category {
        return this._category;
    }

    get id(): number {
        return this._id;
    }

    get uploadDate(): Date {
        return this._uploadDate;
    }

    // Setters

    set aperture(aperture: string | null) {
        this._aperture = aperture;
    }

    set iso(iso: number | null) {
        this._iso = iso;
    }

    set shutterSpeed(shutterSpeed: string | null) {
        this._shutterSpeed = shutterSpeed;
    }

    set focalLength(focalLength: string | null) {
        this._focalLength = focalLength;
    } 

    set height(height: number) {
        this._height = height;
    }

    set width(width: number) {
        this._width = width;
    }

    set category(category: Category) {
        this._category = category;
    }
}