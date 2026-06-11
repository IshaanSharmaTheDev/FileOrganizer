# FileOrganizer

A CLI tool that automatically organizes files in a folder by type, date, or custom rules. Run it on your messy Downloads folder and it sorts everything in seconds.

I made this because my Downloads folder was genuinely out of control. Hundreds of files with no organization whatsoever. Spent 20 minutes building this and it sorted 400+ files in about 2 seconds.

## How it works

```bash
python organize.py ~/Downloads
```

By default it creates subfolders by file type:
```
Downloads/
  Images/     → .jpg, .png, .gif, .webp, .svg ...
  Documents/  → .pdf, .docx, .txt, .md ...
  Videos/     → .mp4, .mkv, .mov ...
  Audio/      → .mp3, .wav, .flac ...
  Archives/   → .zip, .tar.gz, .rar ...
  Code/       → .py, .js, .ts, .html, .css ...
  Other/      → everything else
```

## Options

```bash
# Organize by date instead (YYYY-MM folders)
python organize.py ~/Downloads --by-date

# Dry run — shows what it would do without moving anything
python organize.py ~/Downloads --dry-run

# Undo the last organize operation
python organize.py ~/Downloads --undo

# Custom rules from a config file
python organize.py ~/Downloads --config rules.json
```

## Custom rules

```json
{
  "Screenshots": ["screenshot*.png", "screen*.jpg"],
  "Invoices": ["invoice*.pdf", "receipt*.pdf"],
  "Code": [".py", ".js", ".ts", ".go"]
}
```

## Safety

The `--dry-run` flag is there for a reason. Use it first on important folders. The `--undo` feature keeps a log of all moves and reverses them — but it only works for the most recent organize run.

---

Python stdlib only. No external dependencies. Python 3.7+.
