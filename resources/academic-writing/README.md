# Academic Writing Library

The public landing page is `index.html`. Its records live in `library-data.js`, and the browser-only interaction, search, study plans, translation notebook, recall scheduling, paragraph drafting, and progress summary live in `catalog.js`.

## Adding a paper

1. Add one metadata record to `paperLibrary` in `library-data.js` with title, citation, DOI, topics, article type, source links, access note, and section-specific reading focus.
2. Add five focused entries for the paper to `vocabularyBank`, with concise Chinese explanations, collocations, original example sentences, and a sentence-making prompt.
3. Add source-informed cloze items and Chinese-to-English translation tasks. Label generated practice clearly; do not present newly written examples as quotations from the paper.
4. Use publisher, PubMed, or PMC links for the exact original text. The sentence notebook lets the learner record original sentences and their own sentence-by-sentence translations locally in the browser. Do not republish full articles or translations in this repository.
5. Check that the 7-day and 14-day section plans remain useful for the paper type. For reviews, describe evidence organization rather than inventing original-study Methods or Results.

Progress and drafts use browser `localStorage`; they are not sent to or synced by GitHub Pages. The paragraph lab generates a review prompt for the learner to paste into an AI tool; the static site itself does not make model calls.
