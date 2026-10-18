# zoneinn.vaked.dev

Interactive web studio & landing for **[zoneInn](https://github.com/8b-is/zoneInn)** — **quantTernRadio**, the vaked dial in a terminal and in the browser (`{−1, 0, +1}`).

## Live Capabilities

- **Web Radio Player**:
  - `radio.vaked.dev` — **14 Favourite Musics Crate** (Mahakala, Innerbloom, Faded, Billie Eilish *everything i wanted*, Lorn *Anvil*, Massano *The Feeling*, ARTBAT × Benassi *Love Is Gonna Save Us*, P!NK *Time After Time*, ALEXANDRA DRA <3 *All My Favorite Colors*, ultraLoveGod *Space Floating*, *The Answer to Oblivion*, Øostil & Massano *Drown*, U-Recken *Sovereign Frequencies*, and *Quantshuffle Ternary Canon*) with both **320 kbps MP3 Masters** (`/assets/favourites/*.mp3`) and **432 Hz Verdi Procedural Synthesis**.
  - `music.vaked.dev` — 432 Hz Verdi tuning (`D#m → B → F# → C#`) with 528 Hz Star and 288 Hz Pillar harmonics.
  - `nand.vaked.dev` — 5-stage cross-coupled **Ultrawhale NAND Ring Oscillator** (`{−1, 0, +1}` + Kleene strong-3 `min(a,b)`).
  - `mirror.vaked.dev` — Mirror in F tintinnabuli overtones (`F2 = 87.31 Hz`).
  - **Any HTTP / TuneIn / Icecast URL** — built-in SomaFM / Nightride FM presets plus custom stream URL input with automatic CORS-safe equalizer fallback.
- **Bluetooth & Audio Output Routing**:
  - **Web Bluetooth BLE Pairing (`navigator.bluetooth.requestDevice`)** with first-class recognition for **Soundcore Select 4 GO** (`bt::match_speaker` parity) + GATT Battery Level readout (`0x180F`).
  - **Web Audio Output Sink Routing (`selectAudioOutput` / `enumerateDevices` / `setSinkId`)** to route live radio audio directly to paired Bluetooth A2DP speakers.
  - **Bluetooth AVRCP Hardware Controls (`navigator.mediaSession`)** for play/pause/previous/next from physical speaker buttons.
- **Exact Rust Parity (`#zi-core` / `window.zoneInnCore`)**:
  - 8-band `{−1, 0, +1}` ternary quantizer (`DEFAULT_THRESHOLD = 0.08`) and 64-bit FNV-1a golden hash (`0xe0efe6a3385d3dd3` for `[1, -1, 1, 0, 1, -1, 0, 1]`).
  - Live `quantTernAscii` mirror rendered in-page and copyable/exportable.
  - JSONL refeed generator for [`PeetPedro/ultrawhale-dogfood`](https://huggingface.co/datasets/PeetPedro/ultrawhale-dogfood) (`feeds/nand_oscillator/`).

## Verify & Deploy

```bash
node selftest.mjs
wrangler pages deploy . --project-name zoneinn-vaked-dev --branch main --commit-dirty=true
```

- Palette: `ultra-omnipotent-light` (Palette F) — `design.vaked.dev` → `palettes/8b-is-palettes.json`.
- Custom domain: <https://zoneinn.vaked.dev>

Thanks Yves & Dra <3
