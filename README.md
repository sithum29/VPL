# VPL Season 02 — Virtual Premier League (BBL 2026-27)

The official website for **VPL Season 02**, the cricket fantasy league based on the **Big Bash League 2026-27** (12 Dec 2026 → 26 Jan 2027).

Five owners · five franchises · points on the **cricketxi fantasy system**.

---

## 📁 Folder structure

```
season-2/
├── index.html      ← Homepage (logo, hero, Season 01 summary, Team Registrations, Franchises)
├── matches.html    ← Fixtures & Results (placeholder — fixtures not finalised yet)
├── points.html     ← Points Table (placeholder — tournament hasn't started)
├── teams.html      ← Teams (placeholder — registrations underway)
├── stats.html      ← Stats (placeholder)
├── auction.html    ← Auction (placeholder — date TBA)
├── venues.html     ← Venues (tentative BBL grounds)
├── rules.html      ← Rules & Scoring (cricketxi system preview)
├── css/style.css   ← Master copy of the stylesheet (already embedded in every page)
├── js/main.js      ← Master copy of the scripts (already embedded in every page)
└── logo2.png       ← Official Season 02 logo (dark green + gold emblem)
```

> **Self-contained pages:** every `.html` file has its styles and scripts embedded directly inside it, so any single page renders perfectly on its own — in a browser, an editor preview, or on GitHub Pages. Only two things are loaded from the internet (Google Fonts and Font Awesome icons), and the site still works if those are blocked.

---

## 🚀 Host on GitHub Pages

1. Create a GitHub repository (or use the existing VPL repo — Season 01 lives in the `season-1/` folder, so put this site in a `season-2/` folder).
2. Upload **all** the files from the `season-2/` folder together — keep `logo2.png` in the same folder as the html files.
3. Go to **Settings → Pages**.
4. Under **Branch**, select `main` (or your branch) and the `/ (root)` folder, then **Save**.
5. After a minute your site is live at `https://<username>.github.io/<repo>/season-2/`.

> All links between pages are relative, so the site works from any sub-folder.

---

## 🖥️ Previewing locally

Because every page has its styles embedded, you can preview it anywhere:

- **Double-click any `.html` file** → opens styled correctly in your browser.
- Editor preview pane / "eye" icon → also works, no extra setup.
- Or run a local server: `python3 -m http.server 8000` in the `season-2/` folder, then open `http://localhost:8000/index.html`.

> If a page ever shows a giant logo on a plain white background, it means the stylesheet was not loaded — with the embedded version this can no longer happen, as long as you open the actual `.html` files from this folder.

---

## ✉️ Connect Team Registrations to your email (Formspree) — 2 minutes

The registration form submits via **Formspree** (free plan is enough) and supports the icon upload.

1. Go to **https://formspree.io** and sign up (free).
2. Click **New Form** → give it a name (e.g. "VPL S02 Franchise Registration").
3. Copy your form's endpoint, which looks like `https://formspree.io/f/abcdwxyz`.
4. Open any page (e.g. `index.html`), scroll to the `<script>` block near the bottom, and find:

   ```js
   const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';
   ```

5. Replace `YOUR_FORM_ID` with your real ID, e.g.:

   ```js
   const FORMSPREE_ENDPOINT = 'https://formspree.io/f/abcdwxyz';
   ```

6. **Repeat step 4–5 for all 8 pages** (the script is embedded in every page). Fastest way: use your editor's "Find & Replace in All Files" — search for `YOUR_FORM_ID` and replace with your ID everywhere.
7. Save, re-upload, done. Every registration (owner, previous franchise, name, icon, colour, home city) lands in the email inbox linked to your Formspree account.

> Only `index.html` needs the form for submissions, but updating all pages keeps things consistent if you copy pages around.

> If the site is opened before this step, the form shows a friendly "not configured yet" message instead of failing.

---

## 🏏 Replace the Season 02 logo

Your official Season 02 logo (`logo2.png`) is already wired into every page.

- **To change the logo later:** overwrite the file `logo2.png` with a new image **using the same file name** — done, no code changes.
- **Or use a different file name** (e.g. `vpl-logo.png`), then edit the constant inside each page's `<script>` block (and the master `js/main.js`):

  ```js
  const VPL_LOGO = 'vpl-logo.png';
  ```

If a logo image is ever missing, the site automatically shows a styled "VPL" shield instead of a broken image.

---

## ✏️ Adding real data later (where to edit)

Every placeholder section has a `<!-- ✏️ HOW TO ... -->` comment directly above it:

| What to add | Where |
|---|---|
| Franchise names, logos, home cities | `index.html` → "The Franchises" section, and `teams.html` |
| Match fixtures / results | `matches.html` → comment with card template |
| Points table standings | `points.html` → table `tbody` rows |
| Player stats | `stats.html` → award cards |
| Auction date, purse, player list | `auction.html` → chips & card |
| Venue details | `venues.html` → venue cards |
| Final rulebook | `rules.html` → rule cards |

---

## 🎨 Customising colours & fonts

All colours are CSS variables at the top of the `<style>` block on every page (and in the master copy `css/style.css`):

```css
--gold: #ffd700;      /* primary accent */
--cyan: #a3e635;      /* secondary accent */
--neon-blue: #16a34a; /* glow */
--bg-deep: #03150b;   /* page background */
```

If you change a colour, apply the same change in every page's `<style>` block (or edit the master `css/style.css` and copy it into the pages).

---

## 🔗 Season 01

The full Season 01 archive (45 matches, squads, finale) is still live at **https://sithum29.github.io/VPL/** — linked from the homepage highlights section.

---

© 2026 VPL Season 02 · Virtual Premier League · Big Bash League 2026-27
