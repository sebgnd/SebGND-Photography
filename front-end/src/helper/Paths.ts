import Image from "./Image";

// TODO: Create the different paths

abstract class Paths {

    // Paths to different images format

    static smallImage(imgId?: number, galleryId?: string) {
        return `http://localhost:8000/image/${galleryId}/small_res/${imgId}`
    }

    static mediumImage(imgId?: number, galleryId?: string) {
        return `http://localhost:8000/image/${galleryId}/medium_res/${imgId}`;
    }

    static fullImage(imgId?: number, galleryId?: string) {
        return `http://localhost:8000/image/${galleryId}/full_res/${imgId}`;
    }

    static smallThumbnailImage(imgId?: number, galleryId?: string) {
        return `http://localhost:8000/image/${galleryId}/thumbnail_small/${imgId}`;
    }

    static mediumThumbnailImage(imgId?: number, galleryId?: string) {
        return `http://localhost:8000/image/${galleryId}/thumbnail_medium/${imgId}`;
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