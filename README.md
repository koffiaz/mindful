# Mindful Living — React + Tailwind (EN/ES) for Vercel

This project is ready to deploy on **Vercel (Free)**. It includes:
- React + Vite + TailwindCSS
- React Router (multiple pages)
- Built-in English/Spanish toggle with localStorage
- Lucide icons + Framer Motion
- Flyer showcased from `/public/flyer.png`

## 1) Local Preview
```bash
npm install
npm run dev
```
Open the URL Vite prints (e.g., http://localhost:5173).

## 2) Deploy to Vercel (GitHub import recommended)
1. Create a GitHub repo and upload these files.
2. Go to https://vercel.com → **Add New… → Project** → **Import Git Repository**.
3. Select your repo. Vercel auto-detects Vite/React.
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Click **Deploy**. You’ll get a live URL like `https://your-project.vercel.app`.
5. (Optional) Add a custom domain in the project **Settings → Domains**.

### Alternative: Vercel CLI
```bash
npm i -g vercel
vercel
# follow prompts, then:
vercel --prod
```

## 3) Replace the Flyer Image
Replace `public/flyer.png` with your own image (same filename). Re-deploy.

## 4) Contact Form (optional)
This demo shows a front-end form only. To get emails, connect a service:
- **Formspree**: free starter tier — add their `<form action>` endpoint
- **Resend** + Vercel Functions: send emails from `/api/send-email.js`

## 5) Multilingual Copy
Use the `i18n` object inside `src/App.jsx` to edit English/Spanish text. The globe button switches languages and persists the choice.

Enjoy!
