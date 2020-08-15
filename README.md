# SebGND Photography

## Todos:

### Frontend:
1. Add comments

1. Finish User Website    
    1. Redux
        1. Improve (check everythin and viewer implementation (values already inside state))
    1. Services
        1. Implement status handling (500, 400, 200, etc ...)
    1. Implement Saga

1. Add AdminLayout
1. Start admin website

1. (OPTIONAL) Implement SVG when images are not loaded yet
    

### Backend:
1. Check destroy return value 
1. Resize image + handle image upload to database

## Current API:
Endpoints | Description
----------|------------
/files/image/{type}/{id} | Get all the images (exif, id, category, lense, camera)
/images?offset={offset}&k={k} | Get k images from offset
/images/{id} | Get specific image (same info as the /images but for only one image)
/images/{id}/lense | Get only lense info for specific image
/images/{id}/camera | Get only camera info for specific image
/categories | Get all categories (id, displayName, thumbnail)
/categories?offset={offset}&k={k} | Get k categories from offset
/categories/{id} | Get specific categories (id, displayName, thumbnail)
/categories/{id}/images | Get images for the specified category (exif, id, category, lense, camera)

## Front end z-indexes
Class | z-index
------|--------
TopNavigation | 500
MobileNavigation | 499
Backdrop | 400
