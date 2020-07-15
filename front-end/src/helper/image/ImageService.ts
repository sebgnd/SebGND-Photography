import HttpRequest from '../http/HttpRequest';
import Category from '../category/Category';
import Image from './Image';

export default class ImageService {
    async getFromCategory(id: string): Promise<Image[]> {
        try {
            const data: any = await HttpRequest.getData(`http://localhost:8000/categories/${id}/images`);    
            return data.map((image: any) => Image.format(image));
            
        } catch (e) {
            throw e;
        }
    }

    async getKFromOffset(k: number, offset: number): Promise<Image[]> {
        try {
            const data: any = await HttpRequest.getData(`http://localhost:8000/images?offset=${offset}&k=${k}`);         
            return data.map((image: any) => Image.format(image));

        } catch (e) {
            throw e;
        }
    }

    async get(id: number): Promise<Image> {
        try {
            const data: any = await HttpRequest.getData(`http://localhost:8000/images/${id}`);         
            return Image.format(data);

        } catch (e) {
            throw e;
        }
    }

    async getWithAdjacent(id: number, sameCategory: boolean = false): Promise<(Image | null)[]> {
        try {
            const categoryString: string = sameCategory ? 'true' : 'false';
            const data: any = await HttpRequest.getData(`http://localhost:8000/images/${id}?withAdjacent=true&sameCategory=${categoryString}`);         

            const current: Image = Image.format(data.image);
            const previous: Image | null = data.previous ? Image.format(data.previous) : null;
            const next: Image | null = data.next ? Image.format(data.next) : null;

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