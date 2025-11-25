# Playphrase Video CLI

Search movies by quote - find any spoken phrase across cinema with instant video playback. A modern React application built with Vite, TypeScript, and Tailwind CSS that allows you to search through movie subtitles and watch the exact moments when phrases are spoken.

## 🚀 Live Demo

Visit the live application: [https://nickscherbakov.github.io/playphrase-video-cli/](https://nickscherbakov.github.io/playphrase-video-cli/)

> **Note:** If the live demo shows a blank page, GitHub Pages may not be enabled yet. See [SETUP_GITHUB_PAGES.md](./SETUP_GITHUB_PAGES.md) for quick setup instructions (takes 2 minutes).

## 🌟 Features

- **Phrase Search**: Full-text search across movie/TV subtitle database with instant results and fuzzy matching
- **Video Clip Playback**: Auto-plays video clips with synchronized subtitles showing the exact moment the phrase is spoken
- **Result Navigation**: Browse through all matches with Previous/Next buttons and keyboard shortcuts (Arrow Left/Right)
- **Search History**: Automatically saves your last 10 searches with quick access chips
- **Custom Subtitle Upload**: Upload your own SRT subtitle files to expand the searchable database
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Dark Theme**: Cinematic dark interface optimized for video viewing
- **Smooth Animations**: Polished transitions using Framer Motion

## 🛠️ Technology Stack

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS 4 with custom theming
- **UI Components**: Radix UI primitives with custom styling
- **Animations**: Framer Motion
- **State Management**: React hooks with GitHub Spark KV storage
- **Icons**: Phosphor Icons & Heroicons
- **Notifications**: Sonner toast library
- **Form Validation**: React Hook Form with Zod

## 🛠️ Development

### Prerequisites

- Node.js 20 or higher
- npm

### Installation

```bash
npm install
```

### Development Server

Run the development server with hot module replacement:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

Create an optimized production build:

```bash
npm run build
```

The build output will be in the `dist` directory.

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

### Other Commands

```bash
npm run lint          # Run ESLint
npm run optimize      # Optimize dependencies
npm run kill          # Kill process on port 5000
```

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── ui/              # Reusable UI components (Radix-based)
│   ├── SearchBar.tsx    # Search input with loading state
│   ├── VideoPlayer.tsx  # Video player with subtitle overlay
│   ├── ResultNavigation.tsx  # Previous/Next navigation
│   ├── SearchHistory.tsx     # Recent searches display
│   ├── EmptyState.tsx   # Initial state with suggestions
│   └── UploadDialog.tsx # SRT file upload modal
├── lib/
│   ├── movieDatabase.ts # Movie subtitle data and search logic
│   ├── srtParser.ts    # SRT subtitle file parser
│   └── utils.ts        # Utility functions
├── hooks/              # Custom React hooks
├── styles/             # Global styles and themes
├── App.tsx            # Main application component
└── main.tsx           # Application entry point
```

## 🚀 Deployment

This application is automatically deployed to GitHub Pages when changes are pushed to the `main` branch.

### Deployment Workflow

The GitHub Actions workflow (`.github/workflows/deploy.yml`) automatically:
1. Installs dependencies with npm ci
2. Builds the Vite application with optimized production settings
3. Adds `.nojekyll` file to prevent Jekyll processing
4. Uploads the build artifacts from the `dist` directory
5. Deploys to GitHub Pages at `https://nickscherbakov.github.io/playphrase-video-cli/`

You can also manually trigger a deployment from the Actions tab in the GitHub repository.

### Configuration

The app is configured for GitHub Pages deployment with:
- Base path set to `/playphrase-video-cli/` in `vite.config.ts`
- GitHub Actions workflow with proper permissions
- Automated builds on push to main branch

### GitHub Pages Setup

To enable GitHub Pages for your fork:
1. Go to repository Settings → Pages
2. Set Source to "GitHub Actions"
3. The site will be available at `https://<username>.github.io/playphrase-video-cli/`

### Troubleshooting Deployment

If the GitHub Pages site shows a blank page:

1. **Check GitHub Actions**: Go to the Actions tab and verify the workflow completed successfully
2. **Verify Pages Settings**: 
   - Settings → Pages → Source should be "GitHub Actions"
   - Wait 1-2 minutes after workflow completion for deployment
3. **Check Browser Console**: Open DevTools and look for 404 errors indicating incorrect base path
4. **Clear Cache**: Hard refresh the page (Ctrl+Shift+R or Cmd+Shift+R)
5. **Verify Base Path**: Ensure `vite.config.ts` has `base: '/playphrase-video-cli/'` matching your repo name

## 🎯 How It Works

1. **Search**: Type a phrase and press Enter or click Search
2. **Results**: The app searches through the subtitle database and displays matching entries
3. **Video Playback**: First matching clip automatically plays with subtitle overlay
4. **Navigation**: Use Previous/Next buttons or Arrow keys to browse through results
5. **History**: Recent searches are saved and displayed as clickable chips
6. **Upload**: Add custom movies by uploading SRT subtitle files (with video URLs)

## 🎬 Sample Data

The app comes with 15 pre-loaded famous movie quotes including:
- "I'll be back" - The Terminator (1984)
- "May the Force be with you" - Star Wars (1977)
- "Here's looking at you, kid" - Casablanca (1942)
- "You shall not pass!" - The Lord of the Rings (2001)
- And many more...

You can expand this by uploading your own SRT files with video URLs.

## 🔧 Customization

### Adding Movies

Edit `src/lib/movieDatabase.ts` to add more subtitle entries:

```typescript
{
  id: 'unique-id',
  text: 'Quote text',
  startTime: 1234.5,  // seconds
  endTime: 1237.8,    // seconds
  movieTitle: 'Movie Title',
  year: 2024,
  videoUrl: 'https://example.com/video.mp4',
  thumbnailUrl: 'https://example.com/thumb.jpg' // optional
}
```

### Theming

Customize colors in `src/styles/theme.css` using CSS variables with oklch color space.

## 🤝 Contributing

Contributions are welcome! Here are some ways you can contribute:

- Add more movie quotes to the database
- Improve the search algorithm
- Add new features like filtering by year or movie
- Enhance the UI/UX
- Fix bugs and improve performance
- Write tests

Please feel free to open issues or submit pull requests.

## 🐛 Known Limitations

- Video playback requires CORS-enabled video sources
- Sample videos use Google's test video library
- Search is case-insensitive but requires exact phrase matches
- Custom uploads are stored in browser's local storage only

## 🔗 Related Projects

- Original inspiration: [Playphrase.me](https://playphrase.me)
- Built with [GitHub Spark](https://githubnext.com/projects/github-spark)

## 📞 Support

For issues and questions:
- Open an issue on [GitHub Issues](https://github.com/NickScherbakov/playphrase-video-cli/issues)
- Check existing issues for solutions

## 📄 License

### For Spark Template Resources

The Spark Template files and resources from GitHub are licensed under the terms of the MIT license, Copyright GitHub, Inc.

### For This Project

This project implementation is provided as-is for educational and demonstration purposes.

---

**Built with ❤️ using React, TypeScript, and GitHub Spark**
