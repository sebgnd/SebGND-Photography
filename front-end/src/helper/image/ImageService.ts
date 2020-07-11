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
}