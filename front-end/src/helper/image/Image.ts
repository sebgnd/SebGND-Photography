import Category from '../category/Category';

export default interface Image {
    id: number;
    width: number;
    height: number;
    category: Category;
    uploadDate: Date
    
    aperture?: string | null;
    iso?: number | null;
    shutterSpeed?: string | null;
    focalLength?: string | null;
}