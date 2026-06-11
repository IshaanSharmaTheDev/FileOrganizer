## 🚀 Live Demo: [FileOrganizer](https://ishaansharmathedev.github.io/FileOrganizer/)

> Try it in your browser: **[https://ishaansharmathedev.github.io/FileOrganizer/](https://ishaansharmathedev.github.io/FileOrganizer/)**

# FileOrganizer

A browser-based file organizer that categorizes, finds duplicates, and surfaces large files — all client-side.

## Features
- **Drag & drop** or click to select files
- **10 categories** — Images, Videos, Audio, Documents, Code, Archives, Data, Fonts, Ebooks, Other
- **Category breakdown** — bar chart with count and size per category
- **Duplicate detection** — flags files with same name + size
- **Large file finder** — configurable threshold (default 10MB)
- **Live filter** — search across all file names
- **Stat cards** — total files, total size, category count, duplicate count
- **100% private** — no files are uploaded, everything runs in the browser

## Structure
```
src/organizer.js   # categorize(), getDuplicates(), getLargeFiles(), formatSize(), getStats()
src/app.js         # Drag-drop, rendering, filter, panels
```

## License
MIT
