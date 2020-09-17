import HttpRequest from '../http/HttpRequest';
import HttpResponse from '../http/HttpResponse';
import ImageService from './ImageService';
import Image, { ImagesWithPagination } from './Image';

export default class ImageApi {
    static async get(id: number): Promise<Image> {
        try {
            const response: HttpResponse = await HttpRequest.get(`http://localhost:8000/images/${id}`);         
            return ImageService.format(response.result);

        } catch (e) {
            throw e;
        }
    }

    static async getAll(): Promise<Image[]> {
        try {
            const response: HttpResponse = await HttpRequest.get(`http://localhost:8000/images`);    
            if (response.status === 200) {
                return response.result.map((image: any) => ImageService.format(image));
            } else {
                throw new Error(response.result.error.message);
            }
            
        } catch (e) {
            throw e;
        }
    }

    static async getPage(page: number, itemsPerPage: number = 5): Promise<ImagesWithPagination> {
        try {
            const response: HttpResponse = await HttpRequest.get(`http://localhost:8000/images?page=${page}&itemsPerPage=${itemsPerPage}`);     
            if (response.status === 200) {
                const images = response.result.data.map((image: any) => ImageService.format(image));
                const { hasNext, total, page } = response.result;
                return {
                    images, 
                    hasNext,
                    total,
                    page
                }
            } else {
                throw new Error(response.result.error.message);
            }
        } catch (e) {
            throw e;
        }
    }

    static async getFromCategory(id: string): Promise<Image[]> {
        try {
            const response: HttpResponse = await HttpRequest.get(`http://localhost:8000/categories/${id}/images`);    
            if (response.status === 200) {
                return response.result.map((image: any) => ImageService.format(image));
            } else {
                throw new Error(response.result.error.message);
            }
            
        } catch (e) {
            throw e;
        }
    }

    static async getWithAdjacent(id: number, sameCategory: boolean = false): Promise<(Image | null)[]> {
        try {
            const categoryString: string = sameCategory ? 'true' : 'false';
            const response: HttpResponse = await HttpRequest.get(`http://localhost:8000/images/${id}?withAdjacent=true&sameCategory=${categoryString}`);         
            const { result } = response;

            const current: Image = ImageService.format(result.image);
            const previous: Image | null = result.previous ? ImageService.format(result.previous) : null;
            const next: Image | null = result.next ? ImageService.format(result.next) : null;

            return [
                previous,
                current,
                next
            ];

        } catch (e) {
            throw e;
        }
    }
}