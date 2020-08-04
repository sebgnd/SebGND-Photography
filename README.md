# SebGND Photography

## Todos:

### Frontend:
1. Add comments
1. Create Footer component

1. Finish User Website    
    1. Viewer
        1. Fix z-index 
    1. Redux
        1. Improve (check everythin and viewer implementation (values already inside state))
    1. Implement Saga
    1. Handle errors display
    1. Improve loading display 
    1. Services
        1. Implement status handling (500, 400, 200, etc ...)
    
        
1. Add UserLayout / AdminLayout

### Backend:
1. Check destroy return value 

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
