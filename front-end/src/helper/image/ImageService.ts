import Image from './Image';

export default class ImageService {
    static format(json: any): Image {
        const { id: categoryId, displayName } = json.category;
        const { id, width, height, uploadDate } = json;
        const category = { id: categoryId, displayName }

        return {
            id,
            category,
            width,
            height,
            uploadDate,
            aperture: json.aperture ? json.aperture : null,
            focalLength: json.focalLength ? json.focalLength : null,
            iso: json.iso ? json.iso : null,
            shutterSpeed: json.shutterSpeed ? json.shutterSpeed : null,
        };
    }

    static hasExif(image: Image): boolean {
        return image.aperture !== null 
            && image.iso !== null 
            && image.shutterSpeed !== null 
            && image.focalLength !== null;
    }

    static getExifString(image: Image): string {
        if (this.hasExif(image)) {
            return `ISO: ${image.iso?.toString()}, ${image.shutterSpeed}, ${image.aperture}, ${image.focalLength}`;
        }
        return 'No information.'
    }

    static getFormatedDate(image: Image): string {
        const date = new Date(image.uploadDate);
        return date.toLocaleDateString('en-us', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    }
 
    static getUrl(image: Image, resolutionType: string): string {
        const resolutionsTypes = [
            'full_res',
            'medium_res',
            'small_res',
            'thumbnail_medium',
            'thumbnail_small'
        ];
        if (resolutionsTypes.includes(resolutionType)) {
            return `http://localhost:8000/file/image/${resolutionType}/${image.id}`;
        }
        return `http://localhost:8000/file/image/medium_res/${image.id}`;
    }

    static imageIsPortrait(image: Image): boolean {
        return image.height > image.width;
    }

    static imageIsLandscape(image: Image): boolean {
        return image.width > image.height;
    }

    static getImageType(image: Image): string {
        if (this.imageIsPortrait(image)) {
            return 'portrait';
        }
        return 'landscape';
    }
}