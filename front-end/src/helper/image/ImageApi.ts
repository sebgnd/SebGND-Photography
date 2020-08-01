import HttpRequest from '../http/HttpRequest';
import HttpResponse from '../http/HttpResponse';
import ImageService from './ImageService';
import Image from './Image';

export default class ImageApi {
    static async getFromCategory(id: string): Promise<Image[]> {
        try {
            const response: HttpResponse = await HttpRequest.get(`http://localhost:8000/categories/${id}/images`);    
            return response.data.map((image: any) => ImageService.format(image));
            
        } catch (e) {
            throw e;
        }
    }

    static async getKFromOffset(k: number, offset: number): Promise<Image[]> {
        try {
            const response: HttpResponse = await HttpRequest.get(`http://localhost:8000/images?offset=${offset}&k=${k}`);         
            return response.data.map((image: any) => ImageService.format(image));

        } catch (e) {
            throw e;
        }
    }

    static async get(id: number): Promise<Image> {
        try {
            const response: HttpResponse = await HttpRequest.get(`http://localhost:8000/images/${id}`);         
            return ImageService.format(response.data);

        } catch (e) {
            throw e;
        }
    }

    static async getWithAdjacent(id: number, sameCategory: boolean = false): Promise<(Image | null)[]> {
        try {
            const categoryString: string = sameCategory ? 'true' : 'false';
            const response: HttpResponse = await HttpRequest.get(`http://localhost:8000/images/${id}?withAdjacent=true&sameCategory=${categoryString}`);         
            const { data } = response;

            const current: Image = ImageService.format(data.image);
            const previous: Image | null = data.previous ? ImageService.format(data.previous) : null;
            const next: Image | null = data.next ? ImageService.format(data.next) : null;

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