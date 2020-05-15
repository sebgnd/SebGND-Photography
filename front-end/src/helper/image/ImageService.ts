import HttpRequest from '../http/HttpRequest';
import Category from '../category/Category';
import Image from './Image';

export default class ImageService {
    async getImagesFromCategory(id: string): Promise<Image[]> {
        try {
            const data: any = await HttpRequest.getData(`http://localhost:8000/images/category/${id}`);    
            return data.map((image: any) => Image.format(image));
            
        } catch (e) {
            throw e;
        }
    }

    getKImagesFromOffset(offset: number, k: number): Image[] {
        try {
            const data: any = HttpRequest.getData(`http://localhost:8000/images/${offset}/${k}`);         
            return data.map((image: any) => Image.format(image));

        } catch (e) {
            throw e;
        }
    }
}