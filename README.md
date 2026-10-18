# Sophia AI — Official Website & Product Showcase

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/badge/Sophia-v2.2.0-00e5ff.svg)](download.html)
[![Creator](https://img.shields.io/badge/Creator-Muhammad%20Junaid-38bdf8.svg)](https://github.com/rdxtoolss-glitch)
[![Studio](https://img.shields.io/badge/Studio-Mobo%20Devs-10b981.svg)](https://mobodevs.net)

The official product website and documentation portal for **Sophia AI** — a Jarvis-class, sub-second latency desktop conversational AI assistant engineered for Windows 10 & 11 with native Pakistani Urdu fluency and dual vocal personas.

Designed and engineered by **Muhammad Junaid** at **Mobo Devs Studio** ([mobodevs.net](https://mobodevs.net)).

---

## Visual Design System & Aesthetics

Inspired by the optical realism and sleek aesthetics of [Stonic AI](https://stonicai.com/), the site features a futuristic **Frosted Glass (Glassmorphism)** design language:

- **Floating Frosted Pill Capsule Navigation**: Detached floating navbar capsule (`border-radius: 9999px; backdrop-filter: blur(24px)`) with specular hairline rim highlights (`inset 0 1px 0 0 rgba(255, 255, 255, 0.14)`).
- **Interactive Multi-Theme Switcher**: Instant accent switching between **Cyber Cyan** (default), **Emerald Matrix**, and **Neon Violet** with `localStorage` persistence.
- **Atmospheric Frosted Ambient Light**: Multi-layered background radial glows (`blur(80px)` and `blur(100px)`) that dynamically shift with active theme accents and shine through translucent glass cards.
- **Glassmorphic Bento Grids & Cards**: Translucent surfaces (`rgba(12, 19, 36, 0.48)`), 20px Gaussian blur, 1px specular top highlights, and smooth hover radiance.
- **Pill-Shaped Action Buttons**: Ergonomic rounded buttons (`border-radius: 9999px`) with glowing glass borders and fluid states.
- **Zero Third-Party Runtime Dependencies**: Built entirely with pure, standards-compliant HTML5, modern CSS3, and vanilla JavaScript.

---

## Site Architecture (12 Verified Pages)

| Page | File | Description |
| :--- | :--- | :--- |
| **Home** | [`index.html`](index.html) | Centered hero showcase, telemetry badges, 9 capabilities bento grid, Google OAuth disclosure |
| **Features** | [`features.html`](features.html) | Deep dive into the 9 desktop capabilities with real-world conversational prompts |
| **How It Works** | [`how-it-works.html`](how-it-works.html) | 5-step conversational pipeline, audio-reactive 3D HUD, Windows DPAPI encryption |
| **Download** | [`download.html`](download.html) | Production installer (`v2.2.0`), system requirements, release notes |
| **Documentation** | [`docs.html`](docs.html) | Hands-free voice cheat sheet, quickstart guide, dual persona voice commands |
| **Pricing** | [`pricing.html`](pricing.html) | Open-source Free tier vs. Mobo Devs Pro Managed Bundle comparison |
| **About** | [`about.html`](about.html) | Founder spotlight (Muhammad Junaid), Mobo Devs Studio mission, origin story |
| **FAQ** | [`faq.html`](faq.html) | Frosted accordion answering technical, hardware, privacy, and voice questions |
| **Contact** | [`contact.html`](contact.html) | Frosted glass dispatch form, direct email and studio support channels |
| **Changelog** | [`changelog.html`](changelog.html) | Full release history from v1.0.0 foundation to v2.2.0 production release |
| **Privacy Policy** | [`privacy.html`](privacy.html) | Local-first DPAPI data protection, Google API Services User Data Policy & Limited Use |
| **Terms of Service**| [`terms.html`](terms.html) | MIT open-source license terms, permissible use, system access parameters |

---

## Google OAuth 2.0 & Policy Compliance

The website strictly complies with Google's verification standards:
- **Google API Services User Data Policy**: Explicitly disclosed on both [`index.html`](index.html#google-data) and [`privacy.html`](privacy.html#google-data).
- **Limited Use Policy**: Confirms Sophia's adherence to Google Limited Use requirements, guaranteeing zero unauthorized data transfer or cloud training on user data.

---

## Quality Assurance & Automated Validation

The repository includes a PowerShell verification suite ([`verify_website.ps1`](verify_website.ps1)):

```powershell
powershell.exe -ExecutionPolicy Bypass -File .\verify_website.ps1
```

- **12/12 HTML pages verified**
- **0 broken links** (internal anchor and cross-page navigation)
- **0 missing assets** (images, scripts, icons, stylesheets)
- **100% compliance** with Google API disclosures and author attribution

---

## Author & Attribution

- **Creator & Lead Architect**: [Muhammad Junaid](https://github.com/rdxtoolss-glitch)
- **Studio**: [Mobo Devs Studio](https://mobodevs.net)
- **Contact**: `rdxtoolss@gmail.com`
- **GitHub**: [@rdxtoolss-glitch](https://github.com/rdxtoolss-glitch)

---

## License

This project is licensed under the [MIT License](terms.html).
