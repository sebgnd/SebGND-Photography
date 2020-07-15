import Builder from '../interface/Builder';
import Image from './Image';
import Category from '../category/Category';
import BuilderError from '../error/BuilderError';

export default class ImageBuilder implements Builder<Image> {
    private _id: number;
    private _category: Category;
    
    private _aperture: string | null = null;
    private _iso: number | null = null;
    private _shutterSpeed: string | null = null;
    private _focalLength: string | null = null;
    private _uploadDate: Date;

    private _width: number = 0;
    private _height: number = 0;

    constructor(id: number, category: Category, uploadDate: Date) {
        this._id = id;
        this._uploadDate = uploadDate;
        this._category = category;
    }

    setIso(iso: number) {
        this._iso = iso;
        return this;
    }

    setAperture(aperture: string) {
        this._aperture = aperture;
        return this;
    }

    setShutterSpeed(shutterSpeed: string) {
        this._shutterSpeed = shutterSpeed;
        return this;
    }

    setFocalLength(focalLength: string) {
        this._focalLength = focalLength;
        return this;
    }

    setCategory(category: Category) {
        this._category = category;
        return this;
    }

    setHeight(height: number) {
        this._height = height;
        return this;
    }

    setWidth(width: number) {
        this._width = width;
        return this;
    }

    build(): Image {
        if (this._width === 0 || this._height === 0) {
            throw new BuilderError(["height", "width"]);
        }
        const image = new Image(this._id, this._width, this._height, this._category, this._uploadDate);

        image.aperture = this._aperture;
        image.focalLength = this._focalLength;
        image.shutterSpeed = this._shutterSpeed;
        image.iso = this._iso;
        image.width = this._width;
        image.height = this._height;
        
        return image;
    }

}