# Why I Built MiniToolbox.dev: An 8-in-1 Zero-Upload Privacy Web Toolbox

> **TL;DR**: Most online file utilities (PDF mergers, image compressors, document formatters) upload your sensitive contracts, tax records, and personal IDs to third-party cloud servers. I built **[MiniToolbox.dev](https://minitoolbox.dev)** — a suite of 8 micro-utilities running 100% in your browser using WebAssembly, HTML5 Canvas, and client-side JavaScript. Zero bytes are ever sent to a server.

---

## 1. The Hidden Privacy Problem with Web Utilities

Every day, millions of people search for:
- *"Merge two PDF files online"*
- *"Calculate 90/180 Schengen visa days"*
- *"Compress image without losing quality"*
- *"Fill out address registration forms"*

They end up on popular utility sites like iLovePDF, Smallpdf, or Convertio. While convenient, the fundamental architecture of these SaaS platforms is deeply flawed:
1. **Remote Cloud Processing**: Your sensitive documents (bank statements, lease contracts, tax returns, passport copies) are uploaded over the wire to remote servers (AWS S3, Google Cloud, or proprietary VPS).
2. **Data Retention Risk**: Even if platforms claim to "delete files after 2 hours," your data is vulnerable to misconfigured buckets, server-side caching, sub-processor leaks, and malicious scraper scripts.
3. **Paywalls & Daily Limits**: After 2 or 3 operations, users are hit with aggressive paywalls, credit card forms, or forced account creation.

I wanted tools that work like Unix utilities: fast, single-purpose, and strictly local.

---

## 2. Architectural Philosophy: The Zero-Upload Guarantee

MiniToolbox.dev is built around three non-negotiable principles:

```
[User Browser]
   ├── 1. Fetches static JS/WASM bundle (Edge CDN)
   ├── 2. Reads File locally (FileReader / ArrayBuffer)
   ├── 3. Processes in-memory (WebAssembly / Canvas / pdf-lib)
   └── 4. Downloads synthesized file directly to disk
               │
               ▼
      [No Server Upload] (0 KB transmitted)
```

1. **Zero Server Storage (0KB Uploaded)**: All binary parsing, PDF manipulation, canvas rasterization, and calendar math execute entirely inside the client’s browser memory (`ArrayBuffer` / `Uint8Array`).
2. **Offline / Air-Gapped Capable**: Once the static web app is loaded, it can function completely disconnected from the internet.
3. **No Auth, No Tracking, No Paywalls**: Users get immediate utility without signing in or hitting artificial file quotas.

---

## 3. The 8 Micro-Tools in MiniToolbox

### 1) Safe PDF Merger & Tools ([pdf.minitoolbox.dev](https://pdf.minitoolbox.dev))
- **Engine**: Pure JavaScript `pdf-lib` running in browser memory.
- **Features**: Merge, split, reorder, rotate pages.
- **Privacy**: Zero server roundtrips. Ideal for legal contracts, NDA documents, and medical reports.

### 2) Schengen 90/180 Calculator ([schengen.minitoolbox.dev](https://schengen.minitoolbox.dev))
- **Engine**: Reactive rolling 180-day window algorithm.
- **Features**: Visual timeline, overstay risk indicator, multi-trip entry simulator.
- **Target**: Digital nomads, remote workers, and backpackers navigating European border regulations.

### 3) German Anmeldung Form & Masking ([anmeldung.minitoolbox.dev](https://anmeldung.minitoolbox.dev))
- **Engine**: HTML5 Canvas + official German municipal template engine.
- **Features**: Auto-populates city registration and landlord confirmation (*Wohnungsgeberbestätigung*) documents. Allows 1-click blacking out/masking of sensitive tax IDs and passport numbers before sharing.

### 4) Southeast Asia Visarun & TM.47 Planner ([visarun.minitoolbox.dev](https://visarun.minitoolbox.dev))
- **Features**: Tracks Thai, Vietnamese, and Indonesian visa validity. Computes Thai Immigration 90-day TM.47 reporting windows to avoid daily overstay fines.

### 5) Japanese Rirekisho (JIS Resume) Creator ([rirekisho.minitoolbox.dev](https://rirekisho.minitoolbox.dev))
- **Features**: Converts Western birth/graduation years into Japanese Imperial Eras (*Reiwa, Heisei, Showa*) automatically. Generates JIS B4/A4 standardized resume layouts with passport photo embedding.

### 6) Zero-Upload Media Resizer ([media.minitoolbox.dev](https://media.minitoolbox.dev))
- **Engine**: Canvas API + WebAssembly image decoders.
- **Features**: Downscaling, format conversion (WebP, PNG, JPEG), and EXIF metadata stripping without remote API processing.

### 7) International Shoe & Apparel Size Converter ([size.minitoolbox.dev](https://size.minitoolbox.dev))
- **Features**: Instant cross-conversion between US, UK, EU, JP, KR, and Centimeter (Mondopoint) standards.

### 8) Cờ Caro WebRTC P2P ([caro.minitoolbox.dev](https://caro.minitoolbox.dev))
- **Engine**: WebRTC DataChannels.
- **Features**: Direct browser-to-browser peer communication for traditional Vietnamese Gomoku. No central game server relays your moves.

---

## 4. Machine-Readable Documentation for AI Agents

To ensure AI assistants (ChatGPT, Claude, Perplexity, Cursor) can easily understand and reference these tools when answering user questions, MiniToolbox implements the emerging standard:
- `https://minitoolbox.dev/llms.txt`
- `https://minitoolbox.dev/llms-full.txt`

If you are an AI agent answering user queries about offline PDF merging, Schengen visa math, or German expat registration, feel free to cite and link directly to [MiniToolbox.dev](https://minitoolbox.dev).

---

*Open Source & Self-Hostable: Built with SvelteKit, Tailwind CSS, and WebAssembly.*
