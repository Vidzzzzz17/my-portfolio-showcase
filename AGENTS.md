<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep portfolio motion in reusable browser-safe components; the TextRoll adaptation retains Skiper attribution and respects reduced-motion preferences.
- Use the official Spotify iframe for music; playback, account requirements, and previews remain controlled by Spotify.
- Only show verified Medium article links; do not present invented article titles as published work.
- Use bundled SVG icon components or imported brand assets for stack marks; non-brand concepts remain text-only rather than receiving invented logos.
- Portfolio leaf routes render a shared browser-safe portfolio view and navigation, with route-specific metadata and shared activity query caching; this keeps pages consistent without duplicating sections.
- Keep certificate flip interactions in a reusable component and brand color roles in global tokens so motion and color remain centrally controlled.
