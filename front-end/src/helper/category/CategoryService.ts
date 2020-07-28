import HttpRequest from '../http/HttpRequest';
import Category from './Category';
import CategoryThumbnail from './CategoryThumbnail';
import ImageService from '../image/ImageService';

export default class CategoryService {
    static async get(id: string): Promise<Category> {
        try {
            const data: any = await HttpRequest.getData(`http://localhost:8000/categories/${id}`);
            return this.format(data);
        
        } catch (e) {
            throw e;
        } 
    }

    static async getThumbnail(id: string): Promise<CategoryThumbnail> {
        try {
            const data: any = await HttpRequest.getData(`http://localhost:8000/categories/${id}`);
            return this.formatWithThumbnail(data);
        
        } catch (e) {
            throw e;
        } 
    }

    static async getKThumbnail(k: number): Promise<CategoryThumbnail[]> {
        try {
            const data = await HttpRequest.getData(`http://localhost:8000/categories?offset=0&k=${k}`);
            return data.map((category: any) => {
                return this.formatWithThumbnail(category)
            });

        } catch (e) {
            throw e;
        }
    }

    static async getAllThumbnail(): Promise<CategoryThumbnail[]> {
        try {
            const data = await HttpRequest.getData('http://localhost:8000/categories');
            return data.map((cateogory: any) => {
                return this.formatWithThumbnail(cateogory)
            });
        
        } catch (e) {
            throw e;
        }
    }

    static format(json: any): Category {
        return {
            id: json.id,
            displayName: json.displayName
        };
    }

    static formatWithThumbnail(json: any): CategoryThumbnail {
        const category = this.format(json);
        const image = ImageService.format({ category, ...json.thumbnail.image });
        
        return {
            category,
            image
        }
    }

    static getThumbnailUrl(categoryThumbnail: CategoryThumbnail, resolutionType: string): string {
        const thumbnailTypes = ['thumbnail_medium', 'thumbnail_small'];
        const { image } = categoryThumbnail;

        if (thumbnailTypes.includes(resolutionType)) {
            return `http://localhost:8000/file/image/${resolutionType}/${image.id}`;
        }
        return `http://localhost:8000/image/file/thumbnail_medium/${image.id}`;
    }
}