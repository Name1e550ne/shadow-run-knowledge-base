# Shadowrun 5th Edition Wiki - Project Documentation

## Overview
A lightweight, static HTML wiki for Shadowrun 5th Edition rules and reference. No frameworks, no npm, no dependencies - just pure HTML, CSS, and vanilla JavaScript.

## Project Structure

```
sr5-wiki/
├── index.html          # Home page with navigation and search
├── template.html       # Boilerplate template for creating new pages
├── css/
│   └── style.css       # Cyberpunk/terminal themed stylesheet
├── js/
│   └── search.js       # Lightweight client-side search functionality
└── pages/
    ├── core_rules.html # Core mechanics and dice tests
    ├── attributes.html # Physical, Mental, and Special attributes
    ├── combat.html     # Combat rules, initiative, weapons
    ├── magic.html      # Spellcasting, summoning, adept powers
    ├── gear.html       # Weapons, armor, cyberware, equipment
    └── glossary.html   # A-Z terminology reference
```

## Total Size: ~168KB (well under 10MB limit)

## Cross-Reference System

### ID Format Convention
All anchor IDs follow a strict naming convention for consistent cross-referencing:

| Content Type | ID Format | Example |
|-------------|-----------|---------|
| Attributes | `{name}` (lowercase) | `attributes.html#agility` |
| Skills | `{name}` (lowercase, hyphenated) | `skills.html#close-combat` |
| Spells | `{spell-name}` (lowercase, hyphenated) | `magic.html#mana-bolt` |
| Combat Rules | `{topic}` (lowercase, hyphenated) | `combat.html#initiative` |
| Gear Items | `{item-name}` (lowercase, hyphenated) | `gear.html#ares-predator-iv` |
| Glossary Terms | `{term}` (lowercase, hyphenated) | `glossary.html#dice-pool` |

### Link Examples
```html
<!-- Link to an attribute -->
<a href="pages/attributes.html#agility">Agility</a>

<!-- Link to a spell -->
<a href="pages/magic.html#mana-bolt">Mana Bolt</a>

<!-- Link to a combat rule -->
<a href="pages/combat.html#initiative">Initiative</a>

<!-- Link to gear -->
<a href="pages/gear.html#wired-reflexes">Wired Reflexes</a>
```

## CSS Theme: Cyberpunk/Terminal

### Color Palette
- **Background**: Dark (#0a0a0f, #12121a, #1a1a25)
- **Text**: Light gray (#e0e0e0, #a0a0b0)
- **Neon Blue**: #00f3ff (links, headers)
- **Neon Pink**: #ff00ff (accents, hover states)
- **Neon Green**: #00ff41 (success, tips)
- **Neon Yellow**: #ffee00 (warnings, highlights)
- **Neon Red**: #ff2a2a (danger, errors)

### Features
- Scanline effect overlay for CRT terminal feel
- Neon glow effects on interactive elements
- Responsive tables for modifiers and stats
- Info boxes with colored borders
- Smooth hover transitions

## Search Functionality

The `search.js` file provides:
- Client-side full-text search across all pages
- Relevance scoring (headers weighted higher)
- Debounced input for performance
- Click-to-navigate results
- URL parameter support (`?q=searchterm`)

### Usage
```javascript
// Access search programmatically
window.SR5Search.search('agility');
window.SR5Search.getIndex(); // Get all indexed content
```

## Creating New Pages

1. Copy `template.html` as your starting point
2. Replace placeholders:
   - `{PAGE_TITLE}` - Page title
   - `{PAGE_CONTENT}` - Your content
   - `{LAST_UPDATED}` - Date
3. Add section IDs for cross-referencing: `<section id="your-topic">`
4. Update navigation links in header

## Browser Compatibility

Works in all modern browsers:
- Chrome/Chromium 60+
- Firefox 55+
- Safari 12+
- Edge 79+

No polyfills required.

## Offline Usage

1. Download/copy the entire `sr5-wiki` folder
2. Open `index.html` in any web browser
3. No internet connection required

## File Sizes

| File | Size |
|------|------|
| index.html | 10 KB |
| template.html | 3 KB |
| css/style.css | 7 KB |
| js/search.js | 7 KB |
| pages/core_rules.html | 14 KB |
| pages/attributes.html | 16 KB |
| pages/combat.html | 20 KB |
| pages/magic.html | 19 KB |
| pages/gear.html | 24 KB |
| pages/glossary.html | 20 KB |
| **Total** | **~168 KB** |

## License Notes

Shadowrun is a registered trademark of Topps USA, Inc.
This is an unofficial fan-made resource for personal use.

---
Created: 2024-01-15
Last Updated: 2024-01-15
