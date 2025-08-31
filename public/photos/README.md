# Photos Directory

This directory contains all the Maltese puppy photos for the website.

## How to add new photos:

1. Upload your images directly to this `/public/photos/` folder
2. Images will be automatically available at: `https://pnwmaltese.com/photos/filename.jpg`
3. Update the `images` array in `src/App.tsx` to include new photos

## Current photo naming convention:
- Use descriptive filenames like `IMG_2049.jpg`
- Supported formats: `.jpg`, `.jpeg`, `.png`, `.webp`
- Keep file sizes optimized for web (under 2MB recommended)

## Notes:
- This folder is served directly by the web server
- No build process affects these files
- You can add/remove photos anytime without rebuilding the site