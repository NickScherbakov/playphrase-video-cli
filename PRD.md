# Planning Guide

A web application that lets users search through movie and TV show quotes, instantly playing video clips of the exact moment when the phrase was spoken - bringing the magic of "Playphrase.me" to life with an elegant, focused interface.

**Experience Qualities**:
1. **Instant** - Search results appear and play immediately, creating a seamless flow from thought to discovery
2. **Cinematic** - The interface should feel like a premium streaming service, with rich video presentation and smooth transitions
3. **Playful** - Finding quotes should feel like treasure hunting, with delightful micro-interactions and surprising results

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
- **Functionality**: Remembers recent searches with quick-access chips
- **Purpose**: Lets users revisit interesting phrases without retyping
- **Trigger**: Automatically saves on each successful search
- **Progression**: Search phrase → Results appear → Phrase saved to history → History chips displayed → Click chip to re-search
- **Success criteria**: Last 10 searches persisted, clicking chip instantly replays that search

## Edge Case Handling

- **No results found**: Display encouraging message with random popular phrase suggestions to try
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
- **Foreground/Background Pairings**:
  - Background (Deep Black oklch(0.15 0 0)): Soft white text (oklch(0.95 0 0)) - Ratio 11.2:1 ✓
  - Card (Charcoal oklch(0.25 0 0)): Soft white text (oklch(0.95 0 0)) - Ratio 8.4:1 ✓
  - Primary (Amber oklch(0.75 0.15 75)): Deep black text (oklch(0.15 0 0)) - Ratio 5.8:1 ✓
  - Secondary (Medium Gray oklch(0.35 0 0)): White text (oklch(0.98 0 0)) - Ratio 7.1:1 ✓
  - Accent (Bright Amber oklch(0.80 0.18 75)): Black text (oklch(0.10 0 0)) - Ratio 8.9:1 ✓
  - Muted (Dark Gray oklch(0.30 0 0)): Light gray text (oklch(0.75 0 0)) - Ratio 4.6:1 ✓

## Font Selection

Typography should convey modern sophistication with excellent readability for both the search interface and subtitle text. The primary font should be clean and geometric to contrast with the cinematic theme, creating a contemporary feel.

- **Typographic Hierarchy**:
  - App Title: Inter SemiBold / 24px / tracking-tight - Clean, modern branding
  - Search Input: Inter Regular / 18px / tracking-normal - Comfortable typing size
  - Movie Title: Inter Medium / 16px / tracking-tight - Clear source attribution
  - Subtitle Text: Inter Regular / 14px / tracking-normal - Overlay on video, needs clarity
  - Button Labels: Inter Medium / 14px / tracking-wide - Calls to action
  - Result Counter: Inter Regular / 13px / tracking-normal - Contextual information
  - History Chips: Inter Medium / 12px / tracking-normal - Compact but readable

## Animations

Animations should feel like smooth film transitions - purposeful cuts and elegant fades that enhance the cinematic quality without interfering with content consumption. Every animation should serve either navigation clarity or attention direction.

- **Purposeful Meaning**: Transitions echo film editing techniques - crossfades between clips, smooth scrubbing, subtle zoom on focus to create a director's cut feeling
- **Hierarchy of Movement**:
  - Primary: Video clip transitions (400ms crossfade) - Most important, establishes rhythm
  - Secondary: Search result loading (200ms fade-in) - Confirms action completion
  - Tertiary: Button hover states (150ms) and chip interactions - Subtle polish
  - Ambient: Subtle glow pulse on accent colors when idle - Creates life without distraction

## Component Selection

- **Components**:
  - Input: Primary search field with icon, large and centered for hero placement
  - Button: Navigation controls (Previous/Next), search submit button - all with distinct hover/active states
  - Card: Result container showing movie metadata and context around match
  - Badge: Search history chips with dismiss capability
  - Progress: Loading indicator for video buffering
  - Separator: Subtle dividers between UI sections
  - Skeleton: Loading state for search results and video player

- **Customizations**:
  - Video Player Container: Custom component with aspect ratio enforcement (16:9), overlay controls, and subtitle display
  - Search Hero: Custom centered search experience with animated gradient background
  - Result Counter: Custom badge-style component showing "X of Y results"

- **States**:
  - Search input: Focus state with amber ring glow, subtle scale on focus
  - Navigation buttons: Hover with slight elevation, active with press animation, disabled when at boundaries
  - Video player: Hover reveals overlay controls, click toggles play/pause, loading shows spinner
  - History chips: Hover brightens, click triggers search, dismiss X appears on hover

- **Icon Selection**:
  - MagnifyingGlass: Search action
  - Play/Pause: Video controls
  - CaretLeft/CaretRight: Result navigation
  - X: Dismiss history chips
  - FilmStrip: Decorative brand element
  - Clock: Search history section

- **Spacing**:
  - Container max-width: 1200px for optimal video viewing
  - Section gaps: gap-8 (2rem) for major sections
  - Card padding: p-6 for comfortable content spacing
  - Input padding: px-6 py-4 for substantial touch target
  - Button padding: px-6 py-3 for primary actions, px-4 py-2 for secondary

- **Mobile**:
  - Search bar: Full width on mobile, max-width-2xl on desktop, always prominent
  - Video player: Maintains 16:9 aspect ratio, expands to full width on mobile
  - Navigation: Stack vertically on mobile with larger touch targets (min 44px)
  - History chips: Horizontal scroll container on mobile, wrap on desktop
  - Controls: Bottom-fixed navigation bar on mobile for thumb accessibility
