import HttpRequest from "../http/HttpRequest";
import Image from "../image/Image";
import Category from "../category/Category";
import Gallery from './Gallery';

export default class GalleryService {
    async get(id: string): Promise<Gallery> {
        try {
            const data: any = await HttpRequest.getData(`http://localhost:8000/categories/${id}`);
            return Gallery.format(data);
        } catch (e) {
            throw e;
        }
    }

    async getAll(): Promise<Gallery[]> {
        try {
            const data: any = await HttpRequest.getData('http://localhost:8000/categories');
            return data.map((gallery: any) => Gallery.format(gallery));
        } catch (e) {
            throw e;
        }
    }

    async getK(k: number): Promise<Gallery[]> {
        try {
            const data: any = await HttpRequest.getData(`http://localhost:8000/categories/limit/${k}`);
            return data.map((gallery: any) => Gallery.format(gallery));
        } catch (e) {
            throw e;
        }
    }
}