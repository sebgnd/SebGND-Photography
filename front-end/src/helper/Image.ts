import Gallery from './Gallery';
import Paths from './Paths';

const sizeOf = require('image-size');

export default class Image {
    private id: number;
    private galleryId: string;
    
    // Exif data
    private aperture: string | null = null;
    private iso: number | null = null;
    private shutterSpeed: string | null = null;
    private focalLength: string | null = null;
    private uploadDate: Date;

    // Height and width of the image in px
    //private width: number;
    //private height: number;

    constructor(id: number, galleryId: string, uploadDate: Date) {
        this.id = id;
        this.uploadDate = uploadDate;
        this.galleryId = galleryId;
        this.setSize();
    }

    private setSize() {
        
    }

    setAperture(aperture: string) {
        this.aperture = aperture;
    }

    setISO(iso: number) {
        this.iso = iso;
    }

    setShutterSpeed(shutterSpeed: string) {
        this.shutterSpeed = shutterSpeed;
    }

    setFocalLength(focalLength: string) {
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