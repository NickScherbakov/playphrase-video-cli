# Planning Guide

**Experience Qualities**:

**Experience Qualities**:
  - Single-purpose search with video playback, navigation between results, and persistent search history
## Essential Features
### Phrase Search

**Complexity Level**: Light Application (multiple features with basic state)
  - Single-purpose search with video playback, navigation between results, and persistent search history

## Essential Features

### Phrase Search
- **Functionality**: Full-text search across movie/TV subtitle database with instant results
- **Purpose**: Core value proposition - find any spoken phrase across cinema
- **Trigger**: User types in search bar and presses enter or clicks search
- **Progression**: Type phrase → Submit → Results load → First clip auto-plays → Video shows with context
- **Success criteria**: Results appear within 500ms, exact phrase matches highlighted, minimum 3 results per common phrase

### Video Clip Playback
- **Functionality**: Plays 10-second video clip centered on the exact moment the phrase is spoken
- **Purpose**: Immediate gratification and context for the found phrase
- **Trigger**: Automatically starts when search completes, or when user navigates between results
- **Progression**: Search completes → Video player loads → Clip plays with subtitles → User can replay or navigate
- **Success criteria**: Video starts playing within 1 second, subtitles synchronized, controls are intuitive

### Result Navigation
- **Functionality**: Previous/Next buttons to browse through all matches of the searched phrase
- **Purpose**: Explore multiple contexts where the same phrase appears across different movies
- **Trigger**: Click previous/next buttons after initial search
- **Progression**: Click next → Video fades out → Next clip loads → New clip fades in and plays
- **Success criteria**: Smooth transitions between clips, counter shows position (e.g., "3 of 12"), keyboard shortcuts work

### Search History
Typography should convey modern sophistication with excellent readabil
- **Purpose**: Lets users revisit interesting phrases without retyping
  - Search Input: Inter Regular / 18px / tracking-normal - C
- **Progression**: Search phrase → Results appear → Phrase saved to history → History chips displayed → Click chip to re-search
- **Success criteria**: Last 10 searches persisted, clicking chip instantly replays that search



- **Hierarchy of Movement**:
- **Empty search**: Prevent submission and show placeholder suggestions for inspiration
- **Video load failure**: Show fallback message with option to skip to next result
- **Network delays**: Display loading skeleton and keep last successful result visible
- **Multiple rapid searches**: Debounce input and cancel previous requests to prevent queue buildup
- **Browser back/forward**: Update search query from URL parameters to support browser navigation

## Design Direction

The design should feel like a premium cinematic database - elegant and sophisticated with a hint of film noir mystique. Think dark screening room meets modern streaming interface. The UI should be minimal to keep focus on the video content, but rich enough to convey the depth of the database. Every interaction should feel like flipping through a well-curated film archive.

## Color Selection

Custom palette with cinematic inspiration - deep blacks, warm accent tones, and subtle gradients reminiscent of film lighting.

- **Primary Color**: Deep cinematic black (oklch(0.15 0 0)) - Evokes movie theater darkness, used for main background to make video content pop
- **Secondary Colors**: Charcoal gray (oklch(0.25 0 0)) for cards and surfaces, creates subtle depth layering
- **Accent Color**: Warm amber gold (oklch(0.75 0.15 75)) - Film reel and spotlight inspiration, draws attention to interactive elements and search actions
- **Spacing**:
  - Background (Deep Black oklch(0.15 0 0)): Soft white text (oklch(0.95 0 0)) - Ratio 11.2:1 ✓
  - Input padding: px-6 py-4 for substantial touch target
  - Primary (Amber oklch(0.75 0.15 75)): Deep black text (oklch(0.15 0 0)) - Ratio 5.8:1 ✓
  - Search bar: Full width on mobile, max-width-2xl on desktop, always prominent
  - Accent (Bright Amber oklch(0.80 0.18 75)): Black text (oklch(0.10 0 0)) - Ratio 8.9:1 ✓
  - Muted (Dark Gray oklch(0.30 0 0)): Light gray text (oklch(0.75 0 0)) - Ratio 4.6:1 ✓




































































