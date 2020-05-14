export default class Image {
    private _id: number;
    
    private _aperture: string | undefined = undefined;
    private _iso: number | undefined = undefined;
    private _shutterSpeed: string | undefined = undefined;
    private _focalLength: string | undefined = undefined;
    private _uploadDate: Date;

    private _width: number = 0;
    private _height: number = 0;

    constructor(id: number, uploadDate: Date = new Date()) {
        this._id = id;
        this._uploadDate = uploadDate;
    }

    clone(): Image {
        const image: Image = { ...this, uploadDate: new Date(this.uploadDate) };
        return image;
    }

    static format(json: any): Image {
        const { id, uploadDate } = json;
        return new Image(id, new Date(uploadDate));
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

    get id(): number {
        return this._id;
    }

    get uploadDate(): Date {
        return this._uploadDate;
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