import HttpRequest from '../http/HttpRequest';
import Category from './Category';
import CategoryThumbnail from './CategoryThumbnail';

export default class CategoryService {
    async get(id: string): Promise<Category> {
        try {
            const data: any = await HttpRequest.getData(`http://localhost:8000/categories/${id}`);
            return Category.format(data);
        
        } catch (e) {
            throw e;
        } 
    }

    async getThumbnail(id: string): Promise<CategoryThumbnail> {
        try {
            const data: any = await HttpRequest.getData(`http://localhost:8000/categories/${id}`);
            return CategoryThumbnail.format(data);
        
        } catch (e) {
            throw e;
        } 
    }

    async getKThumbnail(k: number): Promise<CategoryThumbnail[]> {
        try {
            const data = await HttpRequest.getData(`http://localhost:8000/categories?offset=0&k=${k}`);
            return data.map((category: any) => {
                return CategoryThumbnail.format(category)
            });

        } catch (e) {
            throw e;
        }
    }

    async getAllThumbnail(): Promise<CategoryThumbnail[]> {
        try {
            const data = await HttpRequest.getData('http://localhost:8000/categories');
            return data.map((cateogory: any) => {
                return CategoryThumbnail.format(cateogory)
            });
        
        } catch (e) {
            throw e;
        }
    }
}