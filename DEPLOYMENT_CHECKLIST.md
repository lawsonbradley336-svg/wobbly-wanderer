# 🚀 Deployment Checklist - The Wobbly Wanderer

Use this checklist to prepare for deployment!

## Pre-Deployment Verification

### Code Quality
- [ ] No console errors: `npm run build`
- [ ] No TypeScript errors: Check build output
- [ ] Linting passes: `npm run lint` (if configured)
- [ ] All files committed: `git status`
- [ ] No sensitive data in code
- [ ] `.env.local` is in `.gitignore`

### Functionality Testing
- [ ] Can generate crawl for each city
- [ ] Pub data displays correctly
- [ ] Route optimization works
- [ ] Challenges display
- [ ] Save/load crawls works
- [ ] Sober mode toggles
- [ ] All animations smooth
- [ ] Mobile layout responsive
- [ ] No broken links
- [ ] Forms validate correctly

### Browser Testing
- [ ] Chrome/Chromium
- [ ] Firefox
- [ ] Safari
- [ ] Edge
- [ ] Mobile Safari
- [ ] Chrome Mobile

### Performance Check
- [ ] Page loads under 2s
- [ ] No layout shift
- [ ] Animations smooth (60fps)
- [ ] No memory leaks
- [ ] Responsive images (if added)

## Pre-Deployment Preparation

### Environment Setup
- [ ] Create production `.env` file
- [ ] Set `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` (optional)
- [ ] Verify NODE_ENV is set to production
- [ ] Check all config files

### Security Review
- [ ] No API keys in code
- [ ] No passwords in code
- [ ] CORS headers configured (if needed)
- [ ] HTTPS enabled
- [ ] Security headers set
- [ ] Input validation working
- [ ] Error messages don't leak info

### Documentation Review
- [ ] README.md is complete
- [ ] QUICKSTART.md tested
- [ ] DEPLOYMENT.md accurate
- [ ] Code comments clear
- [ ] No outdated docs
- [ ] License included

## Deployment Steps (Choose One)

### Option A: Deploy to Vercel (Recommended)

#### Step 1: Prepare Repository
```bash
git add .
git commit -m "Ready for production deployment"
git push origin main
```

#### Step 2: Create Vercel Account
- [ ] Sign up at [vercel.com](https://vercel.com)
- [ ] Connect GitHub account
- [ ] Authorize Vercel

#### Step 3: Import Project
- [ ] Click "Add New..." → "Project"
- [ ] Select `wobbly-wanderer` repository
- [ ] Click "Import"

#### Step 4: Configure Project
- [ ] Build command: `npm run build` (default)
- [ ] Output directory: `.next` (default)
- [ ] Environment variables: Add `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`

#### Step 5: Deploy
- [ ] Click "Deploy"
- [ ] Wait for build to complete
- [ ] Click "Visit" to see live site
- [ ] Note your URL: `https://[project].vercel.app`

#### Step 6: Custom Domain (Optional)
- [ ] Go to Project Settings → Domains
- [ ] Add custom domain
- [ ] Follow DNS instructions
- [ ] Wait 24-48 hours for propagation

### Option B: Deploy to Netlify

#### Step 1: Prepare Repository
```bash
git add .
git commit -m "Ready for production deployment"
git push origin main
```

#### Step 2: Create Netlify Account
- [ ] Sign up at [netlify.com](https://netlify.com)
- [ ] Connect GitHub account
- [ ] Authorize Netlify

#### Step 3: Import Project
- [ ] Click "Add new site" → "Import an existing project"
- [ ] Select GitHub
- [ ] Find `wobbly-wanderer` repository

#### Step 4: Configure Build
- [ ] Build command: `npm run build`
- [ ] Publish directory: `.next`
- [ ] Environment variables: Add `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`

#### Step 5: Deploy
- [ ] Click "Deploy site"
- [ ] Wait for build and deployment
- [ ] Note your URL: `https://[site].netlify.app`

#### Step 6: Custom Domain (Optional)
- [ ] Go to Site settings → Domain management
- [ ] Add custom domain
- [ ] Update DNS records
- [ ] Wait for DNS propagation

### Option C: Deploy to Docker

#### Step 1: Build Docker Image
```bash
docker build -t wobbly-wanderer:latest .
```

#### Step 2: Test Locally
```bash
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_key \
  wobbly-wanderer:latest
```

#### Step 3: Push to Registry
```bash
# Example: Docker Hub
docker tag wobbly-wanderer:latest username/wobbly-wanderer:latest
docker push username/wobbly-wanderer:latest
```

#### Step 4: Deploy to Server
```bash
# Pull image
docker pull username/wobbly-wanderer:latest

# Run container
docker run -d -p 80:3000 \
  -e NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_key \
  --restart unless-stopped \
  username/wobbly-wanderer:latest
```

## Post-Deployment Testing

### Immediate Checks (First Hour)
- [ ] Site loads successfully
- [ ] No error pages
- [ ] All pages accessible
- [ ] Forms work correctly
- [ ] Data persists
- [ ] Mobile responsive
- [ ] Dark mode renders
- [ ] Animations smooth
- [ ] No console errors (F12)

### Browser Testing
- [ ] Chrome: All features work
- [ ] Firefox: All features work
- [ ] Safari: All features work
- [ ] Mobile: Fully responsive
- [ ] Tablet: Layout adapts

### Functionality Testing
- [ ] Generate crawl works
- [ ] All 5 cities available
- [ ] Challenges display
- [ ] Save/load works
- [ ] Sober mode toggles
- [ ] Map view displays
- [ ] Challenge tracker works

### Performance Testing
- [ ] Page load < 2s
- [ ] No layout shift
- [ ] Core Web Vitals good
- [ ] No memory leaks
- [ ] Animations 60fps

## Monitoring Setup

### Vercel Monitoring (Free)
- [ ] Analytics enabled
- [ ] Web Vitals tracking
- [ ] Check dashboard regularly

### Netlify Monitoring (Free)
- [ ] Deploy logs accessible
- [ ] Analytics enabled
- [ ] Deploy previews configured

### Google Analytics (Optional)
- [ ] Set up Google Analytics
- [ ] Add tracking code
- [ ] Monitor user behavior
- [ ] Track funnel metrics

### Error Tracking (Optional)
- [ ] Consider Sentry.io
- [ ] Set up error logging
- [ ] Configure alerts

## Ongoing Maintenance

### Weekly
- [ ] Check site accessibility
- [ ] Review error logs
- [ ] Monitor performance
- [ ] Check uptime status

### Monthly
- [ ] Update dependencies: `npm outdated`
- [ ] Run security audit: `npm audit`
- [ ] Review analytics
- [ ] Plan improvements

### Quarterly
- [ ] Major version updates
- [ ] Security patches
- [ ] Performance optimizations
- [ ] Feature planning

## Rollback Procedure

### If Deployment Fails

#### Vercel
- [ ] Go to "Deployments" tab
- [ ] Find last working deployment
- [ ] Click "Promote to Production"

#### Netlify
- [ ] Go to "Deploys" tab
- [ ] Find last successful deployment
- [ ] Click "Publish deploy"

#### Docker
```bash
# Stop new container
docker stop container_id

# Run previous version
docker run -d -p 80:3000 previous-version
```

## Success Criteria

Your deployment is successful when:

✅ Site loads without errors
✅ All pages accessible
✅ Forms work correctly
✅ Pub data displays
✅ Route generation works
✅ Challenges display
✅ Save/load functions
✅ Mobile responsive
✅ Animations smooth
✅ No console errors
✅ Performance acceptable
✅ HTTPS enabled
✅ Custom domain working (if added)

## Common Issues & Solutions

### Issue: "Build Failed"
**Solution**:
```bash
npm install
npm run build
# Check error messages
# Fix any TypeScript errors
```

### Issue: "Page Blank/404"
**Solution**:
- Check environment variables
- Verify API keys set
- Check browser console for errors
- Try hard refresh (Ctrl+Shift+R)

### Issue: "Styles Not Loading"
**Solution**:
- Clear browser cache
- Try different browser
- Check CSS file references
- Rebuild: `npm run build`

### Issue: "Slow Performance"
**Solution**:
- Check bundle size: `npm run analyze`
- Optimize images
- Enable compression
- Use CDN
- Check server resources

### Issue: "Mobile Layout Broken"
**Solution**:
- Check viewport meta tag
- Test on real device
- Verify responsive classes
- Check mobile breakpoints

## Questions?

- 📖 See `README.md` for features
- ⚡ See `QUICKSTART.md` for setup
- 🎨 See `STYLING_GUIDE.md` for design
- 🏗️ See `PROJECT_OVERVIEW.md` for architecture
- 📊 See `BUILD_SUMMARY.md` for overview

## Final Checklist

Before going live:
- [ ] Code reviewed
- [ ] Tests passed
- [ ] Documentation complete
- [ ] Environment configured
- [ ] Security verified
- [ ] Performance tested
- [ ] Browsers tested
- [ ] Mobile tested
- [ ] Deployment method chosen
- [ ] Post-deployment plan ready
- [ ] Team notified
- [ ] Launch ready!

---

## 🎉 You're Ready to Deploy!

Your pub crawl generator is production-ready. Choose your deployment platform and go live! 🚀

**Good luck with your deployment!** 🍺

Need help? Check the `DEPLOYMENT.md` file for detailed instructions.
