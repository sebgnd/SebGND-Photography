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
}