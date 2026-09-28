# Wastlund Software Solutions site — agent instructions

This repository is the public site at wastlundsoftwaresolutions.github.io. It is static HTML, CSS, and one script. `main` is published by GitHub Pages. A merge to `main` is live.

When you are implementing an issue and it has no open pull request, open a draft against the branch you were started from. If the issue names a different base branch, use that. When you are reviewing, fixing CI, or addressing comments, stay on the existing pull request branch. Do not open another.

Logan reviews and merges. Agents must not merge, force-push, push to `main`, or commit secrets.

## Where code lives

- `index.html` — home page: about, services, products, contact.
- `styles.css` — the only stylesheet.
- `script.js` — store-link behavior for `.smart-store-link` (`data-ios-url`, `data-android-url`).
- `privacy-policy/` — one page per product.
- `support/` — one page per product.
- `images/` — product icons.
- `googlef400cb02eede5b06.html` — Google site verification. Do not edit or rename it.

The iOS and Android apps are separate repositories. Do not change them unless the task explicitly includes them.

## Architecture

- Pages are hand-written HTML. Do not add a framework, a package manager, or a build step.
- Shared look and type live in `styles.css`. A new page links to that file and uses the existing header, container, and footer classes.
- Store buttons use `smart-store-link` plus the data attributes. Do not send every visitor to one store.
- Internal links are relative. A page under `privacy-policy/` or `support/` links back to `../index.html`.

## Leave these alone unless the task requires them

- `googlef400cb02eede5b06.html`.
- Store URLs, privacy-policy text, and the contact email, unless the task is about that page.
- Product claims. Do not invent features, prices, or company facts.

## Product UI

- Reuse the existing header, section, card, and button classes before adding new ones.
- Every page has a title and a way back to the home page.
- Images have alt text. Links have visible text.
- Text wraps inside cards. Do not let a long title overflow the card.
- A new page works on a narrow phone width as well as a desktop window.

## Before coding

1. Read the task, including any linked notes.
2. Find the closest existing page.
3. Write a short plan.
4. If a requirement is ambiguous and the wrong guess would change what a visitor reads or which store a button opens, comment on the triggering issue or pull request, list it under Unresolved concerns, and continue with the requirements that are clear enough to test. Stop without writing code only when nothing testable remains. Do not invent product behavior.
5. Keep the diff limited to the task.
6. Code you add or edit follows `.cursor/rules/code-hygiene.mdc`. On a feature task, do not restyle, rename, or re-comment code the task did not touch. On an issue that says it is a hygiene pass, apply that rule to every line in the files it names, and leave every other file alone.

## Meeting notes and multi-part issues

When the source is meeting notes or a list of requests:

1. Extract only website work. Ignore iOS and Android items except as a link or a sentence this site should show.
2. For each item record: requirement, ambiguity, likely files, acceptance criteria, and size (small, medium, large).
3. Implement every item that is specified clearly enough to test.
4. Do not implement an item whose behavior is still ambiguous. List it in the pull request under unresolved concerns.
5. Large items that would dominate the review get their own follow-up note. Implement the small and medium items in this pull request.

## Required verification

The check that must pass is:

```bash
python3 .github/scripts/verify_site.py
```

GitHub Actions workflow **Verify** runs that script. It checks that the required pages exist and that local links and images resolve. There is no lint baseline.

## Pull requests

When implementing an issue with no open pull request, open a draft. When one already exists, update that pull request. Include:

- Problem
- What changed
- Decisions that were not obvious
- Commands you ran and their results
- Manual QA Logan can do in a browser
- Unresolved concerns

## Cursor Cloud specific instructions

Run `python3 .github/scripts/verify_site.py` before opening or updating a pull request. If it fails because of your change, fix it and run it again. Do not open a pull request when that command fails. Do not report success with a red check.

`bash .cursor/start-site.sh` serves this repository at http://127.0.0.1:8000. If that port is already open, the command leaves the existing server running.

Do not push to `main`. This branch is the live site. Do not claim a page was checked in a browser unless you actually loaded it.
