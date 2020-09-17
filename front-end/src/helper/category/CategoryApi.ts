import HttpRequest from '../http/HttpRequest';
import HttpResponse from '../http/HttpResponse';
import Category from './Category';
import CategoryThumbnail from './CategoryThumbnail';
import CategoryService from './CategoryService';

export default class CategoryApi {
    static async get(id: string): Promise<Category> {
        try {
            const response: HttpResponse = await HttpRequest.get(`http://localhost:8000/categories/${id}`);
            return CategoryService.format(response.result);
        
        } catch (e) {
            throw e;
        } 
    }

    static async getThumbnail(id: string): Promise<CategoryThumbnail> {
        try {
            const response: HttpResponse = await HttpRequest.get(`http://localhost:8000/categories/${id}`);
            return CategoryService.formatWithThumbnail(response.result);
        
        } catch (e) {
            throw e;
        } 
    }

    static async getKThumbnail(k: number): Promise<CategoryThumbnail[]> {
        try {
            const response: HttpResponse = await HttpRequest.get(`http://localhost:8000/categories?offset=0&k=${k}`);
            return response.result.map((category: any) => {
                return CategoryService.formatWithThumbnail(category)
            });

        } catch (e) {
            throw e;
        }
    }

    static async getAllThumbnail(): Promise<CategoryThumbnail[]> {
        try {
            const response: HttpResponse = await HttpRequest.get('http://localhost:8000/categories');
            return response.result.map((category: any) => {
                return CategoryService.formatWithThumbnail(category)
            });
        
        } catch (e) {
            throw e;
        }
    }
}