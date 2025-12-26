<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1a26Y-v8NPE0kZ1VZxjRiu98Vd-rgNp_-

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Run the app:
   `npm run dev`

## Docker Deploy

This repo supports two Docker deployment modes via `docker-compose.yml`.

### Mode A: Build image on server

```bash
docker compose --profile build up -d --build
```

### Mode B: Use local dist bundle

1. Build static assets:
   ```bash
   npm run build
   ```
2. Start with dist volume:
   ```bash
   docker compose --profile dist up -d
   ```

### Access

Default port mapping is `3000:80`, so open:
`http://<server-ip>:3000`
