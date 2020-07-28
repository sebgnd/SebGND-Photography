import HttpRequest from '../http/HttpRequest';
import Category from '../category/Category';
import Image from './Image';

export default class ImageService {
    static async getFromCategory(id: string): Promise<Image[]> {
        try {
            const data: any = await HttpRequest.getData(`http://localhost:8000/categories/${id}/images`);    
            return data.map((image: any) => this.format(image));
            
        } catch (e) {
            throw e;
        }
    }

    static async getKFromOffset(k: number, offset: number): Promise<Image[]> {
        try {
            const data: any = await HttpRequest.getData(`http://localhost:8000/images?offset=${offset}&k=${k}`);         
            return data.map((image: any) => this.format(image));

        } catch (e) {
            throw e;
        }
    }

    static async get(id: number): Promise<Image> {
        try {
            const data: any = await HttpRequest.getData(`http://localhost:8000/images/${id}`);         
            return this.format(data);

        } catch (e) {
            throw e;
        }
    }

    static async getWithAdjacent(id: number, sameCategory: boolean = false): Promise<(Image | null)[]> {
        try {
            const categoryString: string = sameCategory ? 'true' : 'false';
            const data: any = await HttpRequest.getData(`http://localhost:8000/images/${id}?withAdjacent=true&sameCategory=${categoryString}`);         

            const current: Image = this.format(data.image);
            const previous: Image | null = data.previous ? this.format(data.previous) : null;
            const next: Image | null = data.next ? this.format(data.next) : null;

            return [
                previous,
                current,
                next
            ];

        } catch (e) {
            throw e;
        }
    }

    static format(json: any): Image {
        const { id: categoryId, displayName } = json.category;
        const { id, width, height } = json;
        const category = { id: categoryId, displayName }
        const uploadDate = new Date(json.uploadDate);

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
        return image.uploadDate.toLocaleDateString('en-us', {
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