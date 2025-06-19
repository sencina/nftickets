# 🚀 Deployment Guide for NFTickets Web

## The Problem: SPA Routing Issues

When you deploy a Single Page Application (SPA) like our NFTickets scanner, direct URLs like `/scanner` will return 404 errors because the server doesn't know about client-side routes.

## ✅ Solutions by Platform

### Render (Recommended for this project)
The `render.yaml` and `_redirects` files are already configured. Deploy options:

**Option 1: Using render.yaml (Recommended)**
1. Connect your GitHub repo to Render
2. Render will automatically detect the `render.yaml` file
3. Deploy as a Static Site

**Option 2: Manual Configuration**
1. Create a new Static Site on Render
2. Set Build Command: `npm run build`
3. Set Publish Directory: `dist`
4. The `_redirects` file will handle SPA routing

**Render will automatically handle SPA routing** ✅

### Vercel
The `vercel.json` file is already configured. Just deploy:

```bash
npm run build
# Deploy the dist/ folder to Vercel
```

**Vercel will automatically handle SPA routing** ✅

### Netlify
The `_redirects` file is already configured. Just deploy:

```bash
npm run build
# Deploy the dist/ folder to Netlify
```

**Netlify will automatically handle SPA routing** ✅

### Apache Server
The `.htaccess` file is already configured. Upload to your Apache server:

```bash
npm run build
# Upload the entire dist/ folder contents to your Apache web root
```

### Nginx
Add this to your Nginx configuration:

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### GitHub Pages
GitHub Pages doesn't support server-side redirects, so you need a workaround:

1. Add this to `public/404.html`:
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>NFTickets</title>
    <script>
        sessionStorage.redirect = location.href;
    </script>
    <meta http-equiv="refresh" content="0;URL='/nftickets-web'">
</head>
<body></body>
</html>
```

2. Add this to `public/index.html` in the `<head>`:
```html
<script>
    (function(){
        var redirect = sessionStorage.redirect;
        delete sessionStorage.redirect;
        if (redirect && redirect != location.href) {
            history.replaceState(null, null, redirect);
        }
    })();
</script>
```

## 🔧 Manual Server Configuration

If your hosting provider doesn't support the above files, configure your server to:

1. **Serve `index.html` for all routes that don't match static files**
2. **Set proper MIME types for static assets**
3. **Enable HTTPS** (required for camera access)

### Express.js Example
```javascript
const express = require('express');
const path = require('path');
const app = express();

// Serve static files
app.use(express.static(path.join(__dirname, 'dist')));

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(3000);
```

## 📱 Testing Your Deployment

After deployment, test these URLs directly:

- ✅ `https://your-domain.com/` (should show main page)
- ✅ `https://your-domain.com/scanner` (should show scanner page)
- ✅ `https://your-domain.com/test-qr` (should show test QR page)

**All should work without 404 errors!**

## 🚨 Common Issues

### "File Download" Instead of Page (Especially on Render)
- **Problem**: Server is serving routes as downloadable files
- **Solutions**:
  1. **Check Render Settings**: Ensure you deployed as a "Static Site", not "Web Service"
  2. **Verify Build Settings**: Build Command should be `npm run build`, Publish Directory should be `dist`
  3. **Force Redeploy**: Sometimes Render needs a manual redeploy to pick up the `_redirects` file
  4. **Check Logs**: In Render dashboard, check deployment logs for errors

### 404 Errors on Direct URLs
- **Problem**: Server doesn't know about client-side routes
- **Solution**: Configure server to serve `index.html` for all routes

### Camera Not Working on Deployment
- **Problem**: HTTP instead of HTTPS
- **Solution**: Enable HTTPS on your hosting provider

### Blank Page After Deployment
- **Problem**: Wrong base URL or assets not loading
- **Solution**: Check browser console for errors, ensure all assets are accessible

## 🎯 Quick Deploy Commands

```bash
# Build the project
npm run build

# The dist/ folder contains everything you need to deploy
# Upload the contents of dist/ to your web server
```

## 📋 Pre-Deployment Checklist

- [ ] Build completes without errors: `npm run build`
- [ ] Test locally: `npm run preview`
- [ ] Routing configuration file added for your platform
- [ ] HTTPS enabled on hosting provider
- [ ] Environment variables configured (if needed)
- [ ] Test all routes after deployment

Your NFTickets scanner should now work perfectly on any device! 🎉 