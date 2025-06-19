# 🔧 Fix Render Deployment - Stop File Downloads

## The Problem
When you visit `/scanner` on your Render deployment, it downloads a file instead of showing the page.

## ✅ Step-by-Step Fix

### Step 1: Verify Your Render Service Type
1. Go to your Render Dashboard
2. Click on your NFTickets service
3. **Check**: Is it deployed as a "Static Site" or "Web Service"?
   - ✅ **Should be**: Static Site
   - ❌ **If it's**: Web Service → This is the problem!

### Step 2: If It's a Web Service (Wrong Type)
**You need to create a new Static Site:**

1. **Delete the current Web Service** (or keep it and create new)
2. **Create New Static Site**:
   - Connect your GitHub repo
   - Name: `nftickets-web`
   - Build Command: `npm run build`
   - Publish Directory: `dist`
   - Auto-Deploy: Yes

### Step 3: If It's Already a Static Site
**Check and update settings:**

1. **Go to Settings** → Build & Deploy
2. **Verify**:
   - Build Command: `npm run build`
   - Publish Directory: `dist`
   - Node Version: `18` or higher

3. **Manual Redeploy**:
   - Go to Deploys tab
   - Click "Trigger Deploy"
   - Select "Clear cache and deploy"

### Step 4: Verify Files Are Deployed
After deployment, check these files exist on your site:
- `https://your-site.onrender.com/_redirects` (should show: `/* /index.html 200`)
- `https://your-site.onrender.com/_headers` (should show headers config)

### Step 5: Test the Fix
Visit these URLs directly (not through navigation):
- ✅ `https://your-site.onrender.com/scanner`
- ✅ `https://your-site.onrender.com/test-qr`

**They should show pages, not download files!**

## 🚨 Still Not Working?

### Option A: Force File Recognition
Add this to your `package.json` scripts:
```json
{
  "scripts": {
    "build": "tsc -b && vite build && cp public/_redirects dist/ && cp public/_headers dist/"
  }
}
```

### Option B: Use render.yaml (Automatic)
The `render.yaml` file in your repo should automatically configure everything. If you have this file, Render should detect it and configure routing automatically.

### Option C: Manual _redirects Check
1. **Check if _redirects is working**:
   ```bash
   curl -I https://your-site.onrender.com/_redirects
   ```
   Should return `200 OK`, not `404`

2. **If _redirects is missing**, manually add it:
   - In Render dashboard → Settings → Environment
   - Add custom build command: `npm run build && echo "/* /index.html 200" > dist/_redirects`

## 🎯 Expected Result
After fixing:
- ✅ `/scanner` → Shows QR scanner page
- ✅ `/test-qr` → Shows test QR page  
- ✅ `/` → Shows main page
- ❌ No more file downloads!

## 📞 If Still Stuck
1. **Check Render Deploy Logs** for errors
2. **Try a different browser** (clear cache)
3. **Verify HTTPS** is enabled (required for camera)
4. **Contact Render Support** with this error: "Static site serving routes as downloads instead of HTML"

Your NFTickets scanner will work perfectly once this is fixed! 🎉 