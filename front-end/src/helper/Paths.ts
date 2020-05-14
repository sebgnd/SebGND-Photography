import Image from "./image/Image";

// TODO: Create the different paths

abstract class Paths {
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