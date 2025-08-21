# Cross-Snap 🚀

_Catch browser quirks before your users do — free, open-source, and developer-first._

Cross-Snap is a CLI tool that snapshots your site in Chrome, Firefox, and WebKit (Safari engine), then highlights rendering differences with a simple static report.
**Stop wasting time flipping between browsers — see layout issues instantly.**

---

# ✨ Features

- 📸 One command, three browsers — auto-screenshots your page
- 🔍 Pixel-perfect diffs — see exactly where things break
- 📝 Static HTML reports — open in your browser, share with your team
- 🐳 Local-first — free, fast, works offline
- 🔓 100% open-source (MIT)

---

# 🚀 Quick Start

```bash
npx cross-snap https://example.com
```

<img width="629" height="167" alt="image" src="https://github.com/user-attachments/assets/8340c711-6b54-4063-9d19-1e80e1c23ffa" />

---

# 📊 Example Report

Screenshots would go here in your repo once you generate them.

---

# ⚙️ Options

```bash
# Custom viewport
npx cross-snap https://example.com --width 1440 --height 900

# Skip Firefox
npx cross-snap https://example.com --browsers chrome,webkit
```

# 🛠 Roadmap

- Highlight CSS property differences between browsers
- GitHub Action → auto-run on PRs
- Config file for browser/viewport presets
- Public shareable dashboard

---

# 🤝 Contributing

PRs welcome! Open an issue if you find a bug or want to propose a feature.

---

# 📜 License

MIT — do what you like, just give credit.
