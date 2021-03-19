# SebGND Photography

## Todo
### Urgent
1. Finish File component for UploadModal
1. Fix viewer css
1. Fix viewer not loading image when clicking multiple times
1. Add margin to the bottom of contact page
1. Increase margin on columns in AdminHome page

### Not Urgent
1. Refactor redux
1. Improve DataTable (more specifically the Pagination)
1. Stop scrolling when viewer and other high z-index element are open
1. Add smoother transition when switching image in Viewer
1. Investigate weird loading on galleries
1. Implement placeholders on loading images
1. Fix link on RoundButton
1. Add tests to all files

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
