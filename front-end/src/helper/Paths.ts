import Image from "./image/Image";

// TODO: Create the different paths

abstract class Paths {

    // Paths to different images format

    static smallImage(imgId?: number, galleryId?: string) {
        if (imgId && galleryId) {
            return `http://localhost:8000/image/${galleryId}/small_res/${imgId}`
        }
        return 'https://via.placeholder.com/900x450';
    }

    static mediumImage(imgId?: number, galleryId?: string) {
        if (imgId && galleryId) {
            return `http://localhost:8000/image/${galleryId}/medium_res/${imgId}`;
        }
        return 'https://via.placeholder.com/1920x1080';
    }

    static fullImage(imgId?: number, galleryId?: string) {
        if (imgId && galleryId) {
            return `http://localhost:8000/image/${galleryId}/full_res/${imgId}`;
        }
        return 'https://via.placeholder.com/3840x2160';
    }

    static smallThumbnailImage(imgId?: number, galleryId?: string) {
        if (imgId && galleryId) {
            return `http://localhost:8000/image/${galleryId}/thumbnail_small/${imgId}`;
        }
        return 'https://via.placeholder.com/80';
    }

    static mediumThumbnailImage(imgId?: number, galleryId?: string) {
        if (imgId && galleryId) {
            return `http://localhost:8000/image/${galleryId}/thumbnail_medium/${imgId}`;
        }
        return 'https://via.placeholder.com/450';
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
    static galleryWithId(id?: string) {
        if (id) {
            return `/gallery/${id}`;
        }
        return '/gallery/:id'
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