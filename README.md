# Achraf Ouakrim Portfolio

Single-page graphic-design portfolio for `achrafouakrim.com`, built with Vite, TypeScript, and GitHub Pages deployment.

## Local Development

```bash
npm install
npm run dev
npm run build
```

Portfolio content lives in [src/portfolioData.ts](/Users/mac/Documents/ChatGPT/Portfolio/src/portfolioData.ts). The supplied resume, logo, headshot, project visuals, dielines, and PDFs are organized in `public/assets/`; add new work there and register it in the typed data file when a project needs to appear in the interface.

## Deployment

The site deploys from `main` using [`.github/workflows/deploy.yml`](/Users/mac/Documents/ChatGPT/Portfolio/.github/workflows/deploy.yml). The custom domain is set by [public/CNAME](/Users/mac/Documents/ChatGPT/Portfolio/public/CNAME).

For `achrafouakrim.com`, configure DNS with your domain provider:

- Apex `A` records:
  - `185.199.108.153`
  - `185.199.109.153`
  - `185.199.110.153`
  - `185.199.111.153`
- Optional `AAAA` records:
  - `2606:50c0:8000::153`
  - `2606:50c0:8001::153`
  - `2606:50c0:8002::153`
  - `2606:50c0:8003::153`
- `www` should point to the repository's GitHub Pages domain with a `CNAME` record.

After DNS propagates, enable **Enforce HTTPS** in the repository's GitHub Pages settings.
