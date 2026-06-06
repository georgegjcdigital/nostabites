# Nostabites — Website Deployment Guide

> **Nostalgia in Every Bite** · nostabites.com

This folder contains every file needed to go live. Follow the steps below in order.

---

## What's in this folder

```
deploy/
├── index.html              ← Homepage (SEO meta tags + JSON-LD built in)
├── Nav.jsx                 ← Navigation bar
├── Hero.jsx                ← Hero section
├── Products.jsx            ← Product grid
├── About.jsx               ← Brand story
├── WhatsAppCTA.jsx         ← WhatsApp order section
├── Footer.jsx              ← Site footer
├── ScrollFX.jsx            ← Scroll progress bar
├── Ticker.jsx              ← Announcement strip
├── styles.css              ← All CSS tokens
├── tokens/                 ← Color, type, spacing, effects
│   ├── colors.css
│   ├── typography.css
│   ├── spacing.css
│   └── effects.css
├── assets/                 ← Logos + product photos
│   ├── logo-transparent.png
│   ├── logo-footer-cropped.png
│   ├── logo-icon.webp
│   └── products/
│       ├── kozhukkatta.png
│       ├── pazhampori.png
│       ├── cutlets.png
│       ├── sukiyan.png
│       ├── unniyappam.png
│       └── lifestyle-chai.png
├── CNAME                   ← Tells GitHub Pages your domain
├── .nojekyll               ← Prevents GitHub from breaking CSS
└── README.md               ← This file
```

---

## Step 1 — Create a GitHub repository

1. Go to [github.com](https://github.com) and sign in
2. Click the **+** button (top right) → **New repository**
3. Name it: `nostabites-website` (or anything you like)
4. Set it to **Public** *(required for free GitHub Pages)*
5. Leave everything else as default → click **Create repository**

---

## Step 2 — Upload the files

1. On your new repository page, click **uploading an existing file** (or drag files into the page)
2. Open the `deploy/` folder on your computer
3. Select **all files and folders** inside `deploy/` — drag them all into GitHub
   > ⚠️ Upload the **contents** of the folder, not the folder itself
4. Scroll down, write a commit message like `Initial website upload`
5. Click **Commit changes**

> **Note:** GitHub's web uploader may not show hidden files like `.nojekyll`.  
> After uploading everything else, click **Add file → Create new file**, name it `.nojekyll`, leave it blank, and commit it.

---

## Step 3 — Enable GitHub Pages

1. In your repository, go to **Settings** (top tab)
2. Scroll down to **Pages** (left sidebar)
3. Under **Source**, select:
   - Branch: `main`
   - Folder: `/ (root)`
4. Click **Save**
5. GitHub will show a URL like `https://yourusername.github.io/nostabites-website` — your site is live there within 1–2 minutes

---

## Step 4 — Connect your GoDaddy domain

### 4a. Add your domain in GitHub Pages
1. Still on the Pages settings page, find **Custom domain**
2. Type your domain (e.g. `nostabites.com`) and click **Save**
3. GitHub will verify the CNAME file automatically

### 4b. Update DNS in GoDaddy
1. Log in to [GoDaddy](https://godaddy.com) → **My Products** → find your domain → click **DNS**
2. **Delete** any existing A records pointing to GoDaddy's parked page (type = A, name = @)
3. **Add these 4 A records** (one at a time):

   | Type | Name | Value             | TTL  |
   |------|------|-------------------|------|
   | A    | @    | 185.199.108.153   | 1hr  |
   | A    | @    | 185.199.109.153   | 1hr  |
   | A    | @    | 185.199.110.153   | 1hr  |
   | A    | @    | 185.199.111.153   | 1hr  |

4. **Add a CNAME record** for `www`:

   | Type  | Name | Value                          | TTL  |
   |-------|------|--------------------------------|------|
   | CNAME | www  | yourusername.github.io         | 1hr  |

   > Replace `yourusername` with your actual GitHub username

5. Save all changes

### 4c. Enable HTTPS
1. Go back to GitHub → Settings → Pages
2. Wait for the green **DNS check successful** message (can take up to 48 hours, usually under 1 hour)
3. Once verified, tick **Enforce HTTPS** ✅

---

## Step 5 — After going live (important)

### Update your domain in the SEO metadata
Open `index.html` and search for `nostabites.com` — if your actual domain is different, replace every occurrence. These appear in:
- `<link rel="canonical">`
- `<meta property="og:url">`
- All `@id` fields in the JSON-LD script

### Create your OG image
The social share preview image (`assets/og.jpg`) is referenced but not yet created.
- Size: **1200 × 630 px**
- Design: Product photo on cream background, Nostabites wordmark top-left
- Save as `assets/og.jpg` and re-upload to GitHub

### Submit to Google Search Console
1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Add your domain as a property
3. Verify ownership (GoDaddy has a one-click verification option)
4. Submit your sitemap: `https://nostabites.com/` (single page for now)

### Set up Google Business Profile
1. Go to [business.google.com](https://business.google.com)
2. Create a profile for Nostabites — this activates the Google Knowledge Panel powered by the JSON-LD on your site

---

## Updating the website in future

To make changes:
1. Edit the relevant file (e.g. `Products.jsx` to add a new snack)
2. Go to your GitHub repository
3. Click on the file → click the **pencil edit icon**
4. Make your changes → **Commit changes**
5. GitHub Pages re-deploys automatically within ~1 minute

---

## Need help?

All order enquiries via WhatsApp: **+91 9207575603**  
Website built with: React (CDN) · Plus Jakarta Sans · Cormorant Garamond · GitHub Pages
