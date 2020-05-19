import HttpRequest from '../http/HttpRequest';
import Category from './Category';

export default class CategoryService {
    async get(id: string): Promise<Category> {
        try {
            const data: any = await HttpRequest.getData(`http://localhost:8000/categories/${id}`);
            return Category.format(data);
        
        } catch (e) {
            throw e;
        } 
    }

    async getK(k: number): Promise<Category[]> {
        try {
            const data = await HttpRequest.getData(`http://localhost:8000/categories/limit/${k}`);
            return data.map((category: any) => Category.format(category));

        } catch (e) {
            throw e;
        }
    }

    async getAll(): Promise<Category[]> {
        try {
            const data = await HttpRequest.getData('http://localhost:8000/categories');
            return data.map((cateogory: any) => Category.format(cateogory));
        
        } catch (e) {
            throw e;
        }
    }
}