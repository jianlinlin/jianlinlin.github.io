# Jianlin Lin — academic website

A direct adaptation of the page structure and stylesheet in [Jun-CEN/Jun-CEN.github.io](https://github.com/Jun-CEN/Jun-CEN.github.io), with Jianlin Lin's profile, education, research interests, and publications in place of the original profile. The GitHub showcase section has been replaced by Research Notes and Blog sections.

## Structure

- `index.html` — reference-template profile page adapted with Jianlin Lin's information
- `main.css` — stylesheet copied from the reference website
- `styles.css` — small path, module, and content overrides for this site
- `script.js` — mobile navigation, publication filter, and back-to-top control
- `blog/index.html` — blog landing page, ready for future posts
- `research-notes/index.html` — research notes landing page

## Publish with GitHub Pages

In the repository settings, open **Pages**, choose **Deploy from a branch**, select `main` and the `/ (root)` folder, then save. The repository is now named `jianlinlin.github.io`, so GitHub Pages will serve it at `https://jianlinlin.github.io/` after the first deployment.

## Updating content

Edit the relevant sections in `index.html`. To add a publication, duplicate one `.pub` article and update its year, title, journal, and link. The Blog and Research Notes landing pages use the same page-template styles.
