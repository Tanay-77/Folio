# Folio

A modern, highly visual, Pinterest-powered portfolio built with Next.js, TailwindCSS, and GSAP.

It features a cinematic 3D depth-masked hero section that gracefully fades away to reveal a continuous masonry gallery powered directly by a Pinterest board.

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Run the development server:
   ```bash
   npm run dev
   ```
3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## How to Showcase Your Own Pinterest Board

This portfolio is entirely data-driven via Pinterest. When you pin an image to your board, it automatically shows up on your website!

To connect your own board:
1. **Create a Pinterest Board:** Make sure your board is set to public.
2. **Get your RSS Link:** Go to your board on Pinterest (e.g., `https://in.pinterest.com/username/my-board/`) and add `.rss` to the end of the URL (e.g., `https://in.pinterest.com/username/my-board.rss`).
3. **Update the API:**
   - Open the file `app/api/pinterest/pins/route.ts`
   - Locate line 8: `const rssUrl = '...';`
   - Replace the URL inside the quotes with your new `.rss` link.

That's it! Your website will automatically fetch and display the latest 25 pins from your board in the masonry gallery.

## Customizing the 3D Depth Masking Hero

The stunning "Folio" text effect at the top of the page uses parallax depth masking. To customize it with your own scene:
1. **Background:** Add your background scene image to the `public/` folder and name it `image copy.png` (or update the filename in `components/gallery/FolioText.tsx`).
2. **Foreground (The Mask):** Cut out the foreground elements (like a hill, building, or person) in Photoshop or an AI background remover. Save it as a transparent PNG.
3. **Add the Mask:** Drop it into the `public/` folder as `forground.png`.

The text will automatically perfectly sandwich itself between your background and foreground images!

## Customizing Links
Don't forget to update the floating action button in `components/navigation/ExpandButton.tsx` to point to your own Pinterest or social media profile!
