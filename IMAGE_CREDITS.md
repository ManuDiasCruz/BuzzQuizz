# Image credits — BuzzQuizz Been v2

Selected through [Pixabay image search](https://pixabay.com/images/search/). Source pages were checked on **2026-08-31** and state that the images are available under the [Pixabay Content License](https://pixabay.com/service/license-summary/). Full terms: [Pixabay Terms of Service](https://pixabay.com/service/terms/).

These photographs are integrated into quiz questions, answers, level feedback and the creator gallery, not offered as a standalone stock-photo collection. No endorsement is implied. The images have not been relicensed as project code. Reuse is subject to the source license and any applicable third-party rights. No recognizable people or prominent brands were selected.

| Local asset | Photographer | Original source |
| --- | --- | --- |
| `img/collection/red-panda.webp` | janeb13 | [Red panda, little panda, bamboo — 1182079](https://pixabay.com/photos/red-panda-little-panda-bamboo-1182079/) |
| `img/collection/panda.webp` | Cimberley | [Animal, panda, mammal — 1236875](https://pixabay.com/photos/animal-panda-mammal-species-fauna-1236875/) |
| `img/collection/bamboo.webp` | Ylanite | [Bamboo, jungle, nature — 7363247](https://pixabay.com/photos/bamboo-jungle-nature-plants-garden-7363247/) |
| `img/collection/desert.webp` | TheDigitalArtist | [Mountain, desert, landscape — 2143877](https://pixabay.com/photos/mountain-desert-landscape-nature-2143877/) |
| `img/collection/ocean.webp` | Engin_Akyurt | [Ocean, landscape, mountains — 4346633](https://pixabay.com/photos/ocean-landscape-mountains-wave-4346633/) |
| `img/collection/coffee.webp` | AdelinaZw | [Coffee, berry, breakfast — 6334103](https://pixabay.com/photos/coffee-berry-breakfast-fruit-6334103/) |

## Processing and scope

- Downloaded the public 1280px JPEG versions, resized proportionally to 960px wide, and encoded WebP at quality 82. No AI generation or substantive visual editing was used.
- Only the six optimized WebP derivatives are committed and deployed (387,402 bytes total); temporary original downloads are excluded.
- Cards use consistent `object-fit: cover` framing. Answer text remains readable even if the photo fails. A local neutral SVG fallback replaces failed remote images once, avoiding error loops.
- `img/favicon.svg` and `img/fallback.svg` were authored for this project.
- Original assets remain in repository history. The original README animation is preserved but not copied into the deployment artifact. The old red-panda image and its uncertain external links are not used by the new collection.
- Community and user-supplied image URLs are not verified or relicensed by this project. Creators are prompted to check reuse rights. We do not download or commit community images.
