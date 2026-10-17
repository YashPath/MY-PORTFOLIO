# Yash Pathak — 3D Scroll Portfolio

React + Vite + React Three Fiber + GSAP + Tailwind.
Scroll the page and the camera travels down through the 3D scene: mountains (hero), then a spice bowl (Spices of Yash), a donut with macarons (Bloom Bakery), and a dumbbell (ASH GYM).

## Edit content
All text and links are in `src/data/content.js`.
- `showcase` = the three project sections. Add a project by adding an entry here and a 3D object in `src/three/Scene.jsx` (`SCENES` map).
- Set any link to `null` to hide its button.

## Run locally
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # output in dist/
npm run preview  # test the production build
```

## Deploy (free)
**Vercel:** push to GitHub → vercel.com → Add New Project → import repo → Framework: Vite → Deploy.
**Netlify:** push to GitHub → app.netlify.com → Add new site → Import from Git → Build command `npm run build`, publish directory `dist` → Deploy.

## Performance notes
- 3D code is lazy-loaded; text renders first.
- Mobile: fewer particles/stars, no antialiasing, pixel ratio capped at 1.5.
- `prefers-reduced-motion`: auto-spin and floating stop, camera jumps instead of gliding.
- No WebGL → static gradient background.

## Placeholders still to fill (`ADD` in content.js)
- Bloom Bakery: live link, GitHub (if public), exact tech stack
- ASH GYM: live link, GitHub (if public), exact tech stack, more features
- `public/assets/Yash_Pathak_Resume.pdf` (Resume link in Contact)
