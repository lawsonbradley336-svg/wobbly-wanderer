# 🚀 Deployment Guide - The Wobbly Wanderer

Complete guide to deploying your pub crawl generator to the world!

## Pre-Deployment Checklist

- [ ] All dependencies installed: `npm install`
- [ ] Code builds successfully: `npm run build`
- [ ] No TypeScript errors: `npm run build` (check output)
- [ ] Google Maps API key ready (optional)
- [ ] `.env.local` is in `.gitignore`
- [ ] README.md is up to date
- [ ] All features tested locally

## Option 1: Vercel (Easiest for Next.js)

Vercel is made by the creators of Next.js - it's the fastest and easiest option.

### Setup on Vercel

1. **Create Vercel Account**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub (recommended)

2. **Import Project**
   - Click "Add New..." → "Project"
   - Select your GitHub repository
   - Vercel auto-detects Next.js

3. **Configure Environment**
   - Set `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` in project settings
   - Or skip for demo mode

4. **Deploy**
   - Click "Deploy"
   - Wait ~2-3 minutes
   - Your site is live! 🎉

### Post-Deployment on Vercel

```bash
# Automatic: Any push to main branch redeploys

# Manual: Using Vercel CLI
npm i -g vercel
vercel
```

**Your site URL**: `https://wobbly-wanderer.vercel.app` (or custom domain)

## Option 2: Netlify

Great alternative with excellent free tier.

### Setup on Netlify

1. **Create Netlify Account**
   - Go to [netlify.com](https://netlify.com)
   - Sign up with GitHub

2. **Connect Repository**
   - Click "Add new site" → "Import an existing project"
   - Select your GitHub repository
   - Authorize Netlify

3. **Configure Build Settings**
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
   - **Environment variables**:
     - `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_key`

4. **Deploy**
   - Click "Deploy site"
   - Netlify builds and deploys automatically

### Post-Deployment on Netlify

```bash
# Install Netlify CLI (optional)
npm i -g netlify-cli

# Deploy manually
netlify deploy --prod
```

## Option 3: Docker + Any Server

Perfect for custom deployments (AWS, DigitalOcean, etc.)

### Create Dockerfile

```dockerfile
# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --production
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

EXPOSE 3000
ENV NODE_ENV=production
CMD ["npm", "start"]
```

### Build & Run Docker Image

```bash
# Build image
docker build -t wobbly-wanderer .

# Run container
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_key \
  wobbly-wanderer

# Or use Docker Compose
docker-compose up
```

### Docker Compose

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  wobbly-wanderer:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_key
    restart: unless-stopped
```

## Option 4: Heroku

Good free tier but requires credit card.

### Deploy to Heroku

```bash
# Install Heroku CLI
# From https://devcenter.heroku.com/articles/heroku-cli

# Login
heroku login

# Create app
heroku create wobbly-wanderer

# Set environment variables
heroku config:set NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_key

# Deploy
git push heroku main

# View logs
heroku logs --tail
```

## Option 5: AWS (for Advanced Users)

### Deploy to AWS Amplify

```bash
# Install AWS CLI
npm i -g @aws-amplify/cli

# Configure
amplify configure

# Initialize Amplify
amplify init

# Deploy
amplify publish
```

### Deploy to AWS EC2

```bash
# SSH into instance
ssh -i your-key.pem ec2-user@your-instance

# Install Node.js
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 18

# Clone repo
git clone your-repo-url
cd wobbly-wanderer

# Install and build
npm install
npm run build

# Install PM2 for process management
npm i -g pm2

# Start app
pm2 start "npm start" --name wobbly-wanderer

# Setup auto-restart
pm2 startup
pm2 save
```

## Custom Domain Setup

### Add Custom Domain to Vercel

1. Go to Vercel Project Settings → Domains
2. Enter your domain (e.g., `pubcrawl.com`)
3. Follow DNS instructions for your registrar
4. Wait 24-48 hours for DNS propagation

### Add Custom Domain to Netlify

1. Go to Netlify Site Settings → Domain management
2. Click "Add domain"
3. Follow instructions or add DNS records
4. Update domain registrar

## SSL/TLS Certificate

- **Vercel**: Automatic (included)
- **Netlify**: Automatic (included)
- **Self-hosted**: Use Let's Encrypt (free)

```bash
# Let's Encrypt setup (Linux)
sudo apt-get install certbot
certbot certonly --standalone -d yourdomain.com
```

## Environment Variables for Production

Create `.env.production`:

```bash
# Google Maps
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_production_key

# Analytics (optional)
NEXT_PUBLIC_GA_ID=google_analytics_id
```

**Never commit secrets!** Use platform-specific secret management.

## Performance Optimization

### Enable Next.js Image Optimization

Already included. Images are automatically optimized.

### Setup CDN Cache

For Vercel/Netlify: Automatic

For self-hosted, use Cloudflare:
1. Add your domain to Cloudflare
2. Update DNS to Cloudflare nameservers
3. Automatic caching enabled

### Monitor Performance

```bash
# Build analysis
npm install -D @next/bundle-analyzer

# View bundle
npm run analyze
```

## Monitoring & Logging

### Vercel Analytics (Free)

- Automatic
- View at: `vercel.com/dashboard`
- Shows: Web Vitals, deployment status

### Netlify Analytics (Free)

- Automatic
- View at: `netlify.com/sites/your-site/analytics`

### Custom Monitoring

Add Google Analytics:

```tsx
// In app/layout.tsx
<script
  async
  src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
/>
```

## CI/CD Pipeline

### GitHub Actions for Automated Testing

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run lint
      - run: npm run build

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.event_name == 'push' && github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v2
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-artifact@v2
        with:
          name: next-build
          path: .next
```

## Rollback Procedure

### Vercel
- Click "Deployments" tab
- Select previous deployment
- Click "Promote to Production"

### Netlify
- Click "Deploys" tab
- Find previous deployment
- Click "Publish deploy"

### Self-hosted (Git-based)
```bash
git revert HEAD
git push
# App redeploys from previous commit
```

## Monitoring Checklist

After deployment, verify:

- [ ] Site loads without errors
- [ ] All pages accessible
- [ ] Forms work correctly
- [ ] Pub data displays
- [ ] Animations smooth
- [ ] Mobile responsive
- [ ] Dark mode renders
- [ ] Challenges load
- [ ] Saved crawls work
- [ ] No console errors (F12)

## Troubleshooting Deployment

### Build Fails: "Cannot find module"
```bash
npm install
npm run build
```

### Site Returns 500 Error
- Check environment variables
- Check logs: `npm run dev` locally
- Verify API keys

### Slow Performance
- Enable compression in next.config.js
- Optimize images
- Use CDN
- Check bundle size

### High Memory Usage
- Increase server RAM
- Use `npm ci` instead of `npm install` in production
- Enable build cache

## Scaling for Traffic

### Vercel (Automatic)
- Auto-scales with serverless functions
- No configuration needed
- Pay per request

### Netlify (Automatic)
- Auto-scales
- Unlimited bandwidth (free tier)
- Built-in CDN

### Self-hosted
```bash
# Use PM2 cluster mode
pm2 start "npm start" -i max

# Or use load balancer (nginx)
# Configure reverse proxy
```

## Updating After Deployment

```bash
# Make changes locally
git add .
git commit -m "Update: new feature"
git push origin main

# For Vercel/Netlify: Auto-deploys
# For self-hosted: Pull and restart
git pull
npm run build
pm2 restart wobbly-wanderer
```

## Security Best Practices

- ✅ Never commit `.env.local`
- ✅ Use HTTPS always
- ✅ Keep dependencies updated: `npm audit fix`
- ✅ Use environment variables for secrets
- ✅ Enable branch protection on main
- ✅ Require code review for PRs
- ✅ Monitor for vulnerabilities

## Backup Strategy

```bash
# Backup database (if added)
# Backup environment files
# Backup custom domains
# Backup DNS records
```

## Support & Resources

- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Vercel Docs](https://vercel.com/docs)
- [Netlify Docs](https://docs.netlify.com)
- [Docker Docs](https://docs.docker.com)

---

**Happy deploying! Your pub crawl generator is about to go live! 🍺🚀**
