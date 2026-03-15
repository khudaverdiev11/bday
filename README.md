# 🌹 Saadet Birthday App

A dark romantic birthday web app built with React + Vite + Framer Motion.

## Setup

```bash
npm install
npm run dev
```

## 📸 Adding Your Photos

Create a folder: `public/photos/`

Then rename and place your photos exactly like this:

### Childhood Photos (Childhood page)
| Your photo | Rename to |
|---|---|
| Polaroid of two toddlers hugging | `childhood_hug.jpeg` |
| Little girl on colorful bench | `childhood_bench.jpeg` |
| Baby with cat & stuffed dalmatian | `childhood_cat_dog.jpeg` |
| Baby in wicker chair with dalmatian | `childhood_chair.jpeg` |

### Memories (Gallery page)
| Your photo | Rename to |
|---|---|
| Saadet holding Valentino flowers | `flowers_first.jpeg` |
| Both at concert with stage lights | `concert.jpeg` |
| Seaside restaurant night selfie | `seaside_restaurant.jpeg` |
| Cold night with tea cups | `cold_night_tea.jpeg` |
| Cinema selfie with popcorn | `cinema.jpeg` |
| Discord/laptop showing video call | `discord_call.jpeg` |
| Selfie with her in red knit hat | `red_hat.jpeg` |
| Outdoor night selfie, peace sign | `night_selfie.jpeg` |

### Valentine's Day (Gallery → Valentine's tab)
| Your photo | Rename to |
|---|---|
| Car selfie, her in full glam (red lips) | `val_car1.jpeg` |
| Car selfie both puckering | `val_car2.jpeg` |
| Elevator mirror selfie | `val_elevator.jpeg` |
| Smiling restaurant selfie at night | `val_restaurant.jpeg` |
| Pink roses bouquet with handwritten note | `flowers_note.jpeg` |

## Pages
- **Home** — Hero landing with glowing rose & navigation cards
- **Childhood** — Her baby/childhood photos with warm descriptions
- **Our Story** — Full animated timeline of your relationship
- **Memories** — Filterable photo gallery (Valentine's, Concert, Cinema, Gaming, Dates, Flowers)
- **Love Letter** — Animated letter with envelope design

## 🎵 Adding the Music

1. Download **Adele – Love Song** as an MP3 (YouTube → MP3 converter, or your own file)
2. Create the folder: `public/music/`
3. Rename the file to: `lovesong.mp3`
4. Place it at: `public/music/lovesong.mp3`

The player appears as a floating button (bottom-right corner). It:
- Fades in smoothly when you press play
- Loops the song
- Stays across all page navigations
- Shows floating music notes ♪ when playing
- Has a tooltip on first load saying "Play Adele – Love Song"

## Built with
- React 18 + Vite
- Framer Motion (page transitions, scroll animations)
- React Router DOM (client-side routing)
- Google Fonts: Cormorant Garamond + DM Sans
