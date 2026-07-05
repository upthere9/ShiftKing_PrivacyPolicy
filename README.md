# ShiftKing Privacy Policy

This repository hosts the official Privacy Policy for the **ShiftKing** mobile application, published by 9&U Inc.

The default language is **English** ([en.md](en.md)). Translations for other languages are provided for convenience; in case of any discrepancy, the English version prevails.

## Viewing the Privacy Policy

The primary way to read this policy is through the GitHub Pages site at the repository root:

**https://upthere9.github.io/ShiftKing_PrivacyPolicy/**

The site automatically detects your browser language (`navigator.language`) and shows the matching translation, falling back to English if no match is found.

To open a specific language directly, add a `?lang=` query parameter, e.g.:

- `?lang=en` → [https://upthere9.github.io/ShiftKing_PrivacyPolicy/?lang=en](https://upthere9.github.io/ShiftKing_PrivacyPolicy/?lang=en)
- `?lang=ko` → [https://upthere9.github.io/ShiftKing_PrivacyPolicy/?lang=ko](https://upthere9.github.io/ShiftKing_PrivacyPolicy/?lang=ko)
- `?lang=de` → [https://upthere9.github.io/ShiftKing_PrivacyPolicy/?lang=de](https://upthere9.github.io/ShiftKing_PrivacyPolicy/?lang=de)

A `?lang=` parameter always overrides browser-language detection.

## Supported Languages

| Language | Code | File |
| --- | --- | --- |
| English (default) | `en` | [en.md](en.md) |
| 한국어 (Korean) | `ko` | [ko.md](ko.md) |
| Deutsch (German) | `de` | [de.md](de.md) |
| Español (Spanish) | `es` | [es.md](es.md) |
| Español (México) | `es-MX` | [es-MX.md](es-MX.md) |
| Français (French) | `fr` | [fr.md](fr.md) |
| हिन्दी (Hindi) | `hi` | [hi.md](hi.md) |
| Bahasa Indonesia | `id` | [id.md](id.md) |
| Italiano (Italian) | `it` | [it.md](it.md) |
| 日本語 (Japanese) | `ja` | [ja.md](ja.md) |
| Nederlands (Dutch) | `nl` | [nl.md](nl.md) |
| Polski (Polish) | `pl` | [pl.md](pl.md) |
| Português (Brasil) | `pt-BR` | [pt-BR.md](pt-BR.md) |
| Русский (Russian) | `ru` | [ru.md](ru.md) |
| ไทย (Thai) | `th` | [th.md](th.md) |
| Türkçe (Turkish) | `tr` | [tr.md](tr.md) |
| Tiếng Việt (Vietnamese) | `vi` | [vi.md](vi.md) |
| 简体中文 (Chinese Simplified) | `zh-Hans` | [zh-Hans.md](zh-Hans.md) |

## About This Repository

- All language files live at the repository root (e.g. `en.md`, `ko.md`, `de.md`, ...) and are never modified by the viewer.
- Some translations are still placeholders and will be filled in over time.
- `index.html` is the single shared viewer page. It detects the language, fetches the matching `.md` file, and renders it client-side with `assets/markdown.js` (a small dependency-free Markdown parser) and `assets/style.css`.
- This repository is intended to be served via GitHub Pages, so its structure is kept flat and simple.
