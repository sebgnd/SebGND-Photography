import HttpRequest from '../http/HttpRequest';
import Category from '../category/Category';
import Image from './Image';

export default class ImageService {
    getImagesFromCategory(id: string): Image[] {
        try {
            const data: any | null = HttpRequest.getData(`http://localhost:8000/images/category/${id}`);      
            
            if (this.dataContainsError(data)) {
                throw this.getError(data);
            }
            return data.images.map((image: any) => Image.format(image));

        } catch (e) {
            throw e;
        }
    }

    getKImagesFromOffset(offset: number, k: number): Image[] {
        try {
            const data: any | null = HttpRequest.getData(`http://localhost:8000/images/${offset}/${k}`);           
            
            if (this.dataContainsError(data)) {
                throw this.getError(data);
            }
            return data.map((image: any) => Image.format(image));

        } catch (e) {
            throw e;
        }
    }

    private getError(data: any | null): Error | null {
        if (!data) return new Error('Something unexptected happened. Please try again later.');
        if (data.error) return new Error(data.error.message);
        return null;
    }

    private dataContainsError(data: any | null): boolean {
        return !data || data.error;
    }
}