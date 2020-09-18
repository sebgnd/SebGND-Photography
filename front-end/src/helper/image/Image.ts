import Category from '../category/Category';

export default interface Image {
    id: number;
    width: number;
    height: number;
    category: Category;
    uploadDate: string;
    
    aperture?: string | null;
    iso?: number | null;
    shutterSpeed?: string | null;
    focalLength?: string | null;
    
    [key: string]: any
}

export interface ImagesWithPagination {
    images: Image[];
    hasNext: boolean;
    total: number;
    page: number;
}

export interface ImageWithAdjacent {
    previousId: number | null;
    current: Image | null;
    nextId: number | null
}

export interface Exif {
    iso?: number;
    shutterSpeed?: string;
    focalLength?: string;
    aperture?: string;
}