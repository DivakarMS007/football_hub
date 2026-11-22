# ⚽ PitchPulse — Football Legends & Stars Hub

A sleek, responsive React Single-Page Application (SPA) with client-side routing, showcasing world-class football icons and historic legends with in-depth stats, head-to-head comparisons, and an interactive 4-3-3 Dream XI tactical pitch builder.

Pre-configured for 1-click zero-config deployment to **Vercel** or **GitHub Pages**.

---

## 🚀 Key Features

- **⚡ Client-Side Routing**: Instant zero-reload navigation via React Router v6 (`/`, `/players`, `/player/:id`, `/compare`, `/squad`, `/favorites`, and 404 handler).
- **🌟 18+ Football Superstars & All-Time Legends**:
  - Modern icons: Lionel Messi, Cristiano Ronaldo, Kylian Mbappé, Erling Haaland, Kevin De Bruyne, Luka Modrić, Jude Bellingham, Vinícius Jr, Virgil van Dijk, Mohamed Salah.
  - Historic legends: Pelé, Diego Maradona, Zinedine Zidane, Ronaldinho, Paolo Maldini, Gianluigi Buffon, Thierry Henry, Andrés Iniesta.
- **🔍 Advanced Directory & Filters**: Real-time search across names, clubs, and countries; filter by Era (Active Stars vs Legends) and Position (FW, MF, DF, GK); sort by Goals, Assists, Trophies, Ballon d'Ors, or FIFA Ratings.
- **⚔️ Head-to-Head Clash (`/compare`)**: Compare any two players side-by-side with attribute radar bars, milestone win indicators, and quick rivalry presets (*Messi vs Ronaldo*, *Pelé vs Maradona*, *Mbappé vs Haaland*, etc.).
- **🛡️ Dream XI Tactical Pitch Builder (`/squad`)**: Visual football turf where you can assign players into a 4-3-3 formation, tracking squad average OVR rating, combined goals, and celebrating complete squads with confetti!
- **❤️ LocalStorage Favorites (`/favorites`)**: Bookmark your favorite players with persistent local storage.
- **🎨 Glassmorphic Pitch UI**: Styled with Tailwind CSS, custom pitch turf gradients, and Lucide icons.

---

## 🛠️ Tech Stack

- **Framework**: React 18
- **Routing**: React Router v6 (`HashRouter` / `BrowserRouter`)
- **Styling**: Tailwind CSS with custom glassmorphism and pitch turf themes
- **Icons**: Lucide React
- **Celebrations**: Canvas-Confetti
- **Build Tool**: Vite 6

---

## 💻 Local Development

1. Open your terminal in this directory:
   ```bash
   cd football-hub
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Vite development server:
   ```bash
   npm run dev
   ```

4. Open `http://localhost:5173` in your browser.

---

## 🚢 Deploying to Vercel (Recommended)

This project includes a pre-configured [`vercel.json`](file:///C:/Users/user/.gemini/antigravity/scratch/football-hub/vercel.json) rewrite rule that ensures deep URLs (e.g. `/player/lionel-messi`) load seamlessly without 404 errors.

### Option A: Import via Vercel Web Dashboard (Easiest)
1. Push this project to a new GitHub repository.
2. Go to [vercel.com](https://vercel.com) and log in.
3. Click **"Add New..."** -> **"Project"** and select your GitHub repository.
4. Framework Preset will auto-detect as **Vite**.
5. Click **"Deploy"**. Your app is live in seconds!

### Option B: Deploy using Vercel CLI
```bash
# Install Vercel CLI if not already installed
npm i -g vercel

# Deploy directly from your terminal
vercel
```

---

## 🐙 Deploying to GitHub Pages

This repository includes a pre-configured GitHub Actions workflow in [`.github/workflows/deploy.yml`](file:///C:/Users/user/.gemini/antigravity/scratch/football-hub/.github/workflows/deploy.yml).

### Automated Deployment via GitHub Actions
1. Push your repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of PitchPulse Football Hub"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git push -u origin main
   ```
2. In your GitHub repository:
   - Go to **Settings** > **Pages**.
   - Under **Build and deployment** > **Source**, select **GitHub Actions**.
3. Every push to `main` will automatically build and publish your site to:
   `https://<your-username>.github.io/<your-repo-name>/`

---

## 📁 Project Structure

```
football-hub/
├── .github/workflows/deploy.yml # Automated GitHub Pages workflow
├── public/
│   └── 404.html                # GitHub Pages SPA redirect fallback
├── src/
│   ├── components/
│   │   ├── Footer.jsx          # App footer with tech stack and navigation
│   │   ├── Navbar.jsx          # Glassmorphic header with search & badges
│   │   ├── PlayerCard.jsx      # FIFA-style player card with stats & actions
│   │   ├── ScrollToTop.jsx     # Scrolls window to top on route change
│   │   └── StatRadar.jsx       # Attribute progress bars (Pace, Shoot, etc.)
│   ├── context/
│   │   └── FavoritesContext.jsx# Persistent favorites and squad builder state
│   ├── data/
│   │   └── players.js          # Detailed statistics for 18+ football stars
│   ├── pages/
│   │   ├── ComparePage.jsx     # Head-to-head player comparison
│   │   ├── FavoritesPage.jsx   # Shortlisted favorite players
│   │   ├── HomePage.jsx        # Landing page with spotlight player & leaderboards
│   │   ├── NotFoundPage.jsx    # Custom "Offside" 404 page
│   │   ├── PlayerDetailPage.jsx# Full career stats, club timeline & bio
│   │   ├── PlayersPage.jsx     # Filterable and sortable player directory
│   │   └── SquadBuilderPage.jsx# Interactive 4-3-3 tactical pitch builder
│   ├── App.jsx                 # Client-side router configuration
│   ├── index.css               # Tailwind CSS & custom styles
│   └── main.jsx                # React root entrypoint
├── index.html                  # HTML entrypoint
├── package.json
├── tailwind.config.js
├── vercel.json                 # Vercel SPA routing rewrites
└── vite.config.js              # Vite bundler configuration
```
