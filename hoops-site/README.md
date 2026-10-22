# Hoops quiz game: hosting guide

## Files
- `index.html` is the whole game.
- `classes/index.json` lists the classes (id + display name).
- `classes/<id>.txt` is one question bank per class.

## Deploy on GitHub Pages (free)
1. Create a GitHub repo and upload everything in this folder (keep the `classes` folder).
2. Settings > Pages > Deploy from a branch > `main` / root > Save.
3. After a minute your site is at `https://<you>.github.io/<repo>/`.
4. Give each class its link: `https://<you>.github.io/<repo>/?class=sample-class-a`
   (the link without `?class=` shows a class picker).

Cloudflare Pages and Netlify also work: drag the folder in and you are done.

## Editing questions
1. Open `...?teacher` (or `...?class=<id>&teacher`) to see Teacher tools.
2. Edit the text, press Try it to play-test, then Download .txt.
3. Upload the file to `classes/<id>.txt` in your repo (GitHub: Add file > Upload files, same name replaces it).

## Adding a class
1. In Teacher tools, open Add a class, enter an id and name, press Add.
2. Write the questions, download the .txt, upload it to `classes/`.
3. Copy the generated text over `classes/index.json`.

## Notes
- Test locally with `python3 -m http.server`, then open http://localhost:8000. Opening index.html straight from disk can't load the class files.
- Students need no accounts and nothing about them is collected. Best streak is stored only in their own browser.
- Anyone can add `?teacher` to see the tools, but they can't change your site; only your repo changes the banks.
- The question files are plain text and the correct answers are marked with `*`, so a determined student could read them. Fine for practice games, not for graded tests.
