import Gallery from './Gallery';
import Paths from './Paths';
import Jimp from 'jimp';

export default class Image {
    private id: number;
    private galleryId: string;
    private thumbnail: boolean = false;
    
    private aperture: string | null = null;
    private iso: number | null = null;
    private shutterSpeed: string | null = null;
    private focalLength: string | null = null;
    private uploadDate: Date;

    private fullImageUrl: string;
    private width: number = 0;
    private height: number = 0;

    constructor(id: number, galleryId: string, uploadDate: Date) {
        this.id = id;
        this.uploadDate = uploadDate;
        this.galleryId = galleryId;
        this.fullImageUrl = Paths.fullImage(id, galleryId);
        this.setImageSize();
    }

    async setImageSize() {
        const image = await Jimp.read(this.fullImageUrl);
        this.width = image.bitmap.width;
        this.height = image.bitmap.height;
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