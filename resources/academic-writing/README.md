# Academic Writing Library

The public landing page is `index.html`. Paper records and seven authored daily lessons per paper live in `library-data.js`; browser-only interaction, 7/14-day scheduling, sentence-by-sentence notebook, local answer saving, recall scheduling, paragraph drafting, and progress summary live in `catalog.js`.

Each daily lesson contains a full-section reading assignment, two focused vocabulary items with explanations and sentence prompts, a cloze, a Chinese-to-English exercise with a model answer, a logic-connector question, and a paragraph task. A 14-day cycle revisits the same seven article units for first-pass reading and a second pass of recall, translation, and rewriting. The source-sentence notebook lets the learner work through the complete linked paper one sentence at a time; all entries remain in that browser's local storage.

## Adding a paper

1. Add one metadata record to `paperLibrary` in `library-data.js` with title, citation, DOI, topics, article type, source links, access note, and section-specific reading focus.
2. Add five focused entries for the paper to `vocabularyBank`, with concise Chinese explanations, collocations, original example sentences, and a sentence-making prompt.
3. Add seven tailored `dailyLessons` entries. Ground prompts in the paper's actual question, methods, results, and limitations. Label newly written examples and model answers as practice, not quotations or translations of the source.
4. Link to the publisher, PubMed, or PMC version for exact source text. The learner can enter each original sentence and their translation into the local notebook. Do not mirror full articles or full-article translations in this repository; check the specific article license before any reuse.
5. Keep 7-day and 14-day paths aligned with the paper's real structure. For reviews, describe evidence organization rather than inventing original-study Methods or Results.

Progress and drafts use browser `localStorage`; they are not sent to or synced by GitHub Pages. The paragraph lab generates a review prompt for the learner to paste into an AI tool; the static site itself does not make model calls.
