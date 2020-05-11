import Gallery from './Gallery';

export default class Image {
    private id: number;
    
    // Exif data
    private aperture: string | null = null;
    private iso: number | null = null;
    private shutterSpeed: string | null = null;
    private focalLength: string | null = null;
    private uploadDate: Date;

    // Height and width of the image in px
    private width: number;
    private height: number;

    constructor(id: number, width: number, height: number, uploadDate: Date) {
        this.id = id;
        this.uploadDate = uploadDate;
        this.width = width;
        this.height = height;
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
        return this.height > this.width;
    }

    isLandscape() {
        return this.width >= this.height;
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