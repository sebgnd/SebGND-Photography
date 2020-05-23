# SebGND Photography

## Todos:

### Frontend:
1. Add comments
1. Create Footer component

1. Finish User Website
    1. Recent Page
        1. Make Loader in the center of the page
        
    1. Contact Page
        1. SocialMedia Component
        1. ContactForm Component
    
    1. Recent Page / Gallery Page
        1. Add router to show Slider on top of page with backdrop
        
1. Remove automatic redirect on GalleryButton / RecentImage / SingleImage
1. Add UserLayout / AdminLayout
1. Find how to represent the thumbnail (For Home and Galleries component)
1. Optimize render for RecentImage
1. Create backdrop
1. Remove navigation bar when clicked outside

### Backend:
1. Check destroy return value 
1. Fix sameCategory and withAdjacent boolean values when fetching single image and saying withAdhacent=false

## Current API:
Endpoints | Description
----------|------------
/files/image/{gallery}/{type}/{id} | Get all the images (exif, id, category, lense, camera)
/images?offset={offset}&k={k} | Get k images from offset
/images/{id} | Get specific image (same info as the /images but for only one image)
/images/{id}/lense | Get only lense info for specific image
/images/{id}/camera | Get only camera info for specific image
/categories | Get all categories (id, displayName, thumbnail)
/categories?offset={offset}&k={k} | Get k categories from offset
/categories/{id} | Get specific categories (id, displayName, thumbnail)
/categories/{id}/images | Get images for the specified category (exif, id, category, lense, camera)
