import Gallery from './Gallery';
import Paths from './Paths';
import Jimp from 'jimp';

export default class Image {
    private id: number;
    private galleryId: string;
    private thumbnail: boolean;
    
    private aperture: string | undefined = undefined;
    private iso: number | undefined = undefined;
    private shutterSpeed: string | undefined = undefined;
    private focalLength: string | undefined = undefined;
    private uploadDate: Date;

    private fullImageUrl: string;
    private width: number = 0;
    private height: number = 0;

    constructor(id: number = 1, galleryId: string = 'gallery', uploadDate: Date = new Date(), isThumbnail: boolean = false) {
        this.id = id;
        this.uploadDate = uploadDate;
        this.galleryId = galleryId;
        this.fullImageUrl = Paths.fullImage(id, galleryId);
        this.thumbnail = isThumbnail;
    }

    clone() {
        const newImage: Image = new Image(this.id, this.galleryId, new Date(this.uploadDate), this.thumbnail);

        newImage.setAperture(this.aperture);
        newImage.setFocalLength(this.focalLength);
        newImage.setISO(this.iso);
        newImage.setShutterSpeed(this.shutterSpeed);
        
        return newImage;
    }

    setIsThumbnail(thumbnail: boolean) {
        this.thumbnail = thumbnail;
    }

    isThumbnail() {
        return this.isThumbnail;
    }

    getGalleryId() {
        return this.galleryId;
    }

    setAperture(aperture?: string) {
        this.aperture = aperture;
    }

    setISO(iso?: number) {
        this.iso = iso;
    }

    setShutterSpeed(shutterSpeed?: string) {
        this.shutterSpeed = shutterSpeed;
    }

    setFocalLength(focalLength?: string) {
        this.focalLength = focalLength;
    } 

    isPortrait() {
        return true;
    }

    isLandscape() {
        return true;
    }

    hasExif() {
        return this.aperture !== null 
            && this.iso !== null 
            && this.shutterSpeed !== null 
            && this.focalLength !== null;
    }

    toExifString() {
        if (this.hasExif()) {
            return `ISO: ${this.iso?.toString()}, ${this.shutterSpeed}, ${this.aperture}, ${this.focalLength}`;
        }
        return 'No information'
    }

    getFormatedDate() {
        return this.uploadDate.toLocaleDateString('en-us', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    }

    getId() {
        return this.id;
    }
}