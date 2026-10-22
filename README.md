# Jianlin Lin — academic website

A lightweight, responsive personal academic website for GitHub Pages.

## Structure

- `index.html` — profile, research themes, selected publications, and site navigation
- `styles.css` — responsive visual design
- `script.js` — mobile navigation and current year
- `blog/index.html` — blog landing page, ready for future posts
- `research-notes/index.html` — research notes landing page

## Publish with GitHub Pages

In the repository settings, open **Pages**, choose **Deploy from a branch**, select `main` and the `/ (root)` folder, then save. Because this repository is named `jianlinlin-github-io` rather than `jianlinlin.github.io`, the project site URL will be `https://jianlinlin.github.io/jianlinlin-github-io/` after GitHub Pages finishes its first deployment. If you later rename the repository to `jianlinlin.github.io`, the site can use the shorter root URL.

## Updating content

Edit the relevant sections in `index.html`. To add a publication, duplicate one `.publication` article and update its year, title, journal, and link. The blog and research notes pages are prepared as landing pages; individual posts can be added as HTML files in their respective folders and linked from those pages.
