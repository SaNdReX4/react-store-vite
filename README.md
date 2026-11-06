# React Store (Vite + React)

```bash
npm install
npm run dev      # დეველოპმენტი
npm run build    # production build -> dist/
npm run preview  # build-ის გადახედვა
```

გადაყვანილია Next.js-იდან. Routing: React Router (`src/App.jsx`).
SPA-ს რომ refresh-ზე 404 არ ჰქონდეს, ჰოსტინგზე ყველა მისამართი `index.html`-ზე უნდა გადამისამართდეს
(`vercel.json` და `public/_redirects` უკვე დამატებულია Vercel/Netlify-სთვის).
