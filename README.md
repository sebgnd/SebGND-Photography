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
        
    1. Viewer Page
        
        
1. Add UserLayout / AdminLayout
1. Find how to represent the thumbnail (For Home and Galleries component)

### Backend:
1. Update the api
1. Check destroy return value

## Current API:
Endpoints | Description
----------|------------
/images | Get all images (exif, id, category, lense, camera)
/images/{id} | Get specific image (same info as the /images but for only one image)
/images/{limit}/{n} | Get n images at limit offset (same info as the /images but for only n image)
/categories | Get all categories (id, displayName, thumbnail)
/categories/{id} | Get specific categories (id, displayName, thumbnail)
/categories/limit/{n} | Get n categories

## New API:
Endpoints | Description
----------|------------
/images | Get all the images (exif, id, category, lense, camera)
/images?offset={offset}&k={k} / Get k images from offset
/images/{id} | Get specific image (same info as the /images but for only one image)
/images/{id}/lense | Get only lense info for specific image
/images/{id}/camera | Get only camera info for specific image
/categories | Get all categories (id, displayName, thumbnail)
/categories?offset={offset}&k={k} / Get k categories from offset
/categories/{id} | Get specific categories (id, displayName, thumbnail)
/categories/{id}/images | Get images for the specified category (exif, id, category, lense, camera)