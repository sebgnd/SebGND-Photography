import Image from "./Image";

// TODO: Create the different paths

abstract class Paths {

    // Paths to different images format

    static smallImage(image?: Image, galleryName?: string) {
        return 'https://via.placeholder.com/450x800'
    }

    static mediumImage(image?: Image, galleryName?: string) {
        return 'https://via.placeholder.com/1920x1080'
    }

    static fullImage(image?: Image, galleryName?: string) {
        return 'https://via.placeholder.com/3840x2160'
    }

    static smallThumbnailImage(image?: Image, galleryName?: string) {
        return 'https://via.placeholder.com/80'
    }

    static mediumThumbnailImage(image?: Image, galleryName?: string) {
        return 'https://via.placeholder.com/450'
    }

    // Paths to other pages

    // Name of the gallery
    // Id of the image
    static viewer(name?: string, id?: number) {
        if (name && id) {
            return `/viewer/${name}/${id}`;
        }
        return `/viewer/:name/:id`;
    }

    static gallery() {
        return '/gallery';
    }

    // Name of the gallery
    static galleryWithName(name?: string) {
        if (name) {
            return `/gallery/${name}`;
        }
        return '/gallery/:name'
    }

    static recent() {
        return '/recent';
    }

    static home() {
        return '/';
    }

    static contact() {
        return '/contact';
    }

}

export default Paths;