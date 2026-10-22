# Class quiz games: setup guide

## Files
- `index.html`: student entry. Reads `?class=<id>` and sends them to that class's game (or shows a class list).
- `hoops.html`, `panels.html`: the two games.
- `shared.js`: question loading and the quiz pop-up, used by both games.
- `teacher.html`: teacher hub (settings, questions, preview, downloads).
- `classes/index.json`: every class and its settings.
- `classes/<id>.txt`: the questions for one class.

## First-time setup on GitHub
1. Unzip this folder on your computer.
2. In your repo, click Add file > Upload files and drag in `index.html`, `hoops.html`, `panels.html`, `teacher.html`, `shared.js`, and the `classes` folder. Same-named files (like the old `index.html`) are replaced. Commit.
3. Settings > Pages: Deploy from a branch, `main`, `/ (root)`.
4. After a minute or two, open `https://<you>.github.io/<repo>/teacher.html`.

## Weekly workflow
1. Open `teacher.html`, pick a class (or Add a class), choose the game, set the numbers, edit questions.
2. Press Preview to play-test with your unsaved edits.
3. Download the questions (.txt) and index.json.
4. In GitHub, open the `classes` folder > Add file > Upload files, drop both in, commit.
5. Wait 1 to 2 minutes, then give students their link: `https://<you>.github.io/<repo>/?class=<id>` (the hub shows it).

## Settings
- Hoops: balls earned per correct answer.
- Panel Pop: energy per correct answer, energy per cursor step, energy per swap.
- Old index.json entries with no settings default to hoops, 2 balls, 100 energy, 1 per step, 3 per swap.

## Notes
- Test locally with `python3 -m http.server` and open http://localhost:8000/teacher.html. Opening files directly from disk won't load the class files.
- The hub is not password protected, but it can't change your site; only your GitHub uploads can.
- Question files are plain text with answers marked `*`, so a determined student could read them. Fine for practice, not for graded tests.
- No student data is collected.
