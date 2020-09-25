import Image from '../image/Image';

export default interface Category {
    id: string;
    displayName: string;
}

export interface CategoryWithThumbnail {
    category: Category;
    image: Image;
}