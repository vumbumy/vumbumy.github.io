# Search discovery checks

The sitemap nominates published Korean and English articles plus the two home,
about and archive pages. Generated tag listings remain accessible and indexable
through normal links, but are not submitted as additional search landing pages.
Removing a URL from the sitemap does not remove it from Google's index.

Article `lastmod` uses the recorded content update or publication date. About
pages do not inherit unrelated article dates. Do not refresh dates merely to
encourage a crawl. Translations keep their own canonical URLs and reciprocal
language links. The build uses the public hostname by default.

RSS is available at `/rss.xml` and `/en/rss.xml`, including all published articles
in the respective language. HTML heads advertise the corresponding feed.

After `npm ci` and `npm run build`, run `npm run check:search`. The Pages workflow
also runs this check before uploading an artifact. It verifies rendered sitemap
and RSS targets, canonical URLs, reciprocal translations, article indexability,
and article discovery within two HTML links from the home pages. For a project
deployment use `python3 scripts/check-search-output.py --site SITE --base BASE`.

These checks do not certify indexing or search performance. Use Search Console
URL Inspection for representative articles and keep dated results privately.
The page-indexing example list cannot be downloaded through the URL Inspection
API. An exact classification of that list requires the Search Console CSV export.
Do not interpret all unindexed URLs on a domain property as blog article failures.

The current Google connection has read-only scopes. It can inspect URLs and read
sitemap status, but cannot submit a sitemap or request indexing. A full property
user can use URL Inspection's live test and request indexing for a few important
articles after checking the deployed output. Repeated requests do not guarantee
or speed up indexing. Track crawl, index, search impressions and search clicks
separately; do not describe a technical deployment as an SEO result.
