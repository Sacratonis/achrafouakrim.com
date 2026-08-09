# Achraf Ouakrim Portfolio

Single-page graphic-design portfolio for `achrafouakrim.com`, built with Vite, TypeScript, and Cloudflare Pages deployment.

## Local Development

```bash
npm install
npm run dev
npm run build
```

Portfolio content lives in [src/portfolioData.ts](/Users/mac/Documents/ChatGPT/Portfolio/src/portfolioData.ts). The supplied resume, logo, headshot, project visuals, dielines, and PDFs are organized in `public/assets/`; add new work there and register it in the typed data file when a project needs to appear in the interface.

## Deployment

The `main` branch is connected to the Cloudflare Pages project `achrafouakrim-portfolio`.
Cloudflare builds with `npm run build` and publishes `dist`. The production domain is
`https://achrafouakrim.com`, with `www` configured as a paired hostname.

To publish an update, push a commit to `main`; Cloudflare Pages will build and deploy it
automatically. The Cloudflare dashboard remains the place to manage the custom domain,
DNS, redirects, and HTTPS.
