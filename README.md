# SebGND Photography

## Todos:

### Frontend:
1. Add comments
1. Create checkbox component
1. Create icon button
1. Maybe merge IconButton and RoundButton (IconButton with border props ?)

1. User Website
    1. Improve performance when changing ImageFade

1. Admin Website
    1. Home page
    1. Gallery Settings page
    1. Messages page
    1. Change password

1. (OPTIONAL) Implement Saga
1. (OPTIONAL) Implement SVG when images are not loaded yet
    

### Backend:
1. Check destroy return value 
1. Resize image + handle image upload to database
1. Implement security
    1. Find package
    1. Login
    1. Role
    1. uuid
    1. Session key

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
