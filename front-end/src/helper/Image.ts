import Gallery from './Gallery';
import Paths from './Paths';
import Jimp from 'jimp';

export default class Image {
    private _id: number;
    private _galleryId: string;
    private _isThumbnail: boolean;
    
    private _aperture: string | undefined = undefined;
    private _iso: number | undefined = undefined;
    private _shutterSpeed: string | undefined = undefined;
    private _focalLength: string | undefined = undefined;
    private _uploadDate: Date;

    private _fullImageUrl: string;
    private _width: number = 0;
    private _height: number = 0;

    constructor(id: number = -1, galleryId: string = 'gallery', uploadDate: Date = new Date(), isThumbnail: boolean = false) {
        this._id = id;
        this._uploadDate = uploadDate;
        this._galleryId = galleryId;
        this._fullImageUrl = Paths.fullImage(id, galleryId);
        this._isThumbnail = isThumbnail;
    }

    static format(imageJson: any) {
        // TODO: Implement
    }

    clone(): Image {
        const newImage: Image = new Image(this.id, this.galleryId, new Date(this.uploadDate), this.isThumbnail);

        newImage.aperture = this.aperture;
        newImage.focalLength = this.focalLength;
        newImage.iso = this.iso;
        newImage.shutterSpeed = this.shutterSpeed;
        
        return newImage;
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

    isPortrait(): boolean {
        return true;
    }

    isLandscape(): boolean {
        return true;
    }

    get isThumbnail(): boolean {
        return this.isThumbnail;
    }

    get id(): number {
        return this._id;
    }

    get galleryId(): string {
        return this._galleryId;
    }

    get uploadDate(): Date {
        return this._uploadDate;
    }

    set isThumbnail(thumbnail: boolean) {
        this._isThumbnail = thumbnail;
    }

    set aperture(aperture: string) {
        this._aperture = aperture;
    }

    set iso(iso: number) {
        this._iso = iso;
    }

    set shutterSpeed(shutterSpeed: string) {
        this._shutterSpeed = shutterSpeed;
    }

    set focalLength(focalLength: string) {
        this._focalLength = focalLength;
    } 
}