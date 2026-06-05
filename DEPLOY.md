# Deploy Towers to GitHub Pages

## Quick Setup (5 minutes)

### 1. Create a GitHub repo

```bash
# Option A: GitHub CLI
gh repo create stormlight-towers --public --clone
cd stormlight-towers

# Option B: Manual
# Go to github.com → New Repository → name it "stormlight-towers" → Create
# Then clone it locally
```

### 2. Copy the game file

```bash
# Copy from your Stormlight project folder
cp ~/Documents/Claude/Projects/Stormlight/towers.html ./index.html
cp ~/Documents/Claude/Projects/Stormlight/README.md ./README.md
```

**Important:** Rename `towers.html` to `index.html` — GitHub Pages serves `index.html` as the default page.

### 3. Push to GitHub

```bash
git add .
git commit -m "Initial release: Towers v3 — Rosharan card game"
git push origin main
```

### 4. Enable GitHub Pages

1. Go to your repo on GitHub
2. **Settings** → **Pages** (left sidebar)
3. Under "Source", select **Deploy from a branch**
4. Branch: **main**, folder: **/ (root)**
5. Click **Save**

Your game will be live at: `https://YOUR-USERNAME.github.io/stormlight-towers/`

Takes ~60 seconds to deploy. Share that URL with anyone.

### 5. Update the game

```bash
# After making changes:
cp ~/Documents/Claude/Projects/Stormlight/towers.html ./index.html
git add . && git commit -m "Update description" && git push
```

GitHub Pages auto-redeploys on push.

---

## Sharing the URL

Once deployed, share the link via:
- Discord / Slack / Teams
- Email
- Social media
- Brandon Sanderson fan communities (17th Shard, r/Stormlight_Archive)

The game is a single HTML file with zero dependencies — it loads instantly on any device with a browser.

---

## Optional: Custom Domain

If you want a custom URL like `towers.roshar.games`:

1. Buy a domain (Namecheap, Cloudflare, etc.)
2. Add a `CNAME` file to your repo containing just the domain name
3. Configure DNS: CNAME record pointing to `YOUR-USERNAME.github.io`
4. In GitHub Pages settings, enter your custom domain

---

## Collecting Feedback

Add a feedback link to the game by editing the menu screen. Point it to:
- **GitHub Issues** (best for structured feedback)
- **Google Form** (best for non-technical testers)
- **Discord channel** (best for community discussion)
