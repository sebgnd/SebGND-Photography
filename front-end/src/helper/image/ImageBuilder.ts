import Builder from '../interface/Builder';
import Image from './Image';
import Category from '../category/Category';

export default class ImageBuilder implements Builder<Image> {
    private _id: number;
    private _category: Category;
    
    private _aperture: string | undefined = undefined;
    private _iso: number | undefined = undefined;
    private _shutterSpeed: string | undefined = undefined;
    private _focalLength: string | undefined = undefined;
    private _uploadDate: Date;

    private _width: number = 0;
    private _height: number = 0;

    constructor(id: number, uploadDate: Date) {
        this._id = id;
        this._uploadDate = uploadDate;
        this._category = new Category();
    }

    setIso(iso: number) {
        this._iso = iso;
        return this;
    }

    setAperture(aperture?: string) {
        this._aperture = aperture;
        return this;
    }

    setShutterSpeed(shutterSpeed: string) {
        this._shutterSpeed = shutterSpeed;
        return this;
    }

    setFocalLength(focalLength?: string) {
        this._focalLength = focalLength;
        return this;
    }

    setCategory(category: Category) {
        this._category = category;
        return this;
    }

    build(): Image {
        const image = new Image(this._id, this._uploadDate, this._category);
        image.aperture = this._aperture;
        image.focalLength = this._focalLength;
        image.shutterSpeed = this._shutterSpeed;
        image.iso = this._iso;
        return image;
    }

}