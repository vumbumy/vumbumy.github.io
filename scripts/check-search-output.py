#!/usr/bin/env python3
"""Validate the rendered discovery paths; this cannot certify Google indexing."""
import argparse
from collections import deque
from html.parser import HTMLParser
import json
from pathlib import Path
from urllib.parse import unquote, urljoin, urlsplit
import xml.etree.ElementTree as ET


class Page(HTMLParser):
    def __init__(self, html):
        super().__init__()
        self.links = []
        self.anchors = []
        self.robots = []
        self.feed(html)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == 'link':
            self.links.append(attrs)
        if tag == 'a' and attrs.get('href'):
            self.anchors.append(attrs['href'])
        if tag == 'meta' and attrs.get('name') in ('robots', 'googlebot'):
            self.robots.append(attrs.get('content', ''))


def check(dist, site, base):
    home = site.rstrip('/') + '/' + base.strip('/')
    home = home.rstrip('/') + '/'

    def local(url):
        parts = urlsplit(url)
        assert parts.netloc == urlsplit(home).netloc, f'Unexpected host: {url}'
        prefix = urlsplit(home).path
        assert parts.path.startswith(prefix), f'Escaped base path: {url}'
        relative = unquote(parts.path[len(prefix):])
        path = dist / relative
        return path / 'index.html' if parts.path.endswith('/') else path

    posts = {}
    for prefix in ('posts', 'en/posts'):
        for path in (dist / prefix).glob('*/index.html'):
            url = urljoin(home, path.parent.relative_to(dist).as_posix() + '/')
            html = path.read_text()
            page = Page(html)
            canon = [x['href'] for x in page.links if x.get('rel') == 'canonical']
            assert len(canon) == 1 and local(canon[0]) == path, f'Canonical: {url}'
            assert not any('noindex' in x.lower() for x in page.robots), url
            assert 'BlogPosting' in html, f'Missing article metadata: {url}'
            assert any(x.get('type') == 'application/rss+xml' for x in page.links), url
            posts[url] = page
    assert posts, 'No public articles'

    sitemap = ET.parse(dist / 'sitemap-0.xml')
    entries = sitemap.findall('{*}url')
    locations = [entry.findtext('{*}loc') for entry in entries]
    assert len(locations) == len(set(locations)), 'Duplicate sitemap URLs'
    assert len(locations) == len(posts) + 6, 'Missing primary pages or unexpected listings'
    for entry, url in zip(entries, locations):
        assert local(url).is_file(), f'Sitemap target absent: {url}'
        assert '/tags/' not in url, f'Tag listing nominated: {url}'
        for link in entry.findall('{*}link'):
            assert local(link.attrib['href']).is_file(), f'Broken sitemap translation: {url}'
    for url, page in posts.items():
        assert local(url) in {local(x) for x in locations}, f'Article omitted: {url}'
        for alternate in (x for x in page.links if x.get('hreflang') in ('ko', 'en')):
            target = local(alternate['href'])
            assert target.is_file(), f'Broken hreflang: {url}'
            reverse = Page(target.read_text())
            assert any(local(x['href']) == local(url) for x in reverse.links
                       if x.get('hreflang') in ('ko', 'en')), f'Non-reciprocal hreflang: {url}'

    expected_sitemap = urljoin(home, 'sitemap-index.xml')
    assert 'Sitemap: ' + expected_sitemap in (dist / 'robots.txt').read_text()
    assert ET.parse(dist / 'sitemap-index.xml').findtext('{*}sitemap/{*}loc') == urljoin(home, 'sitemap-0.xml')
    for language, prefix in (('ko', ''), ('en', 'en/')):
        channel = ET.parse(dist / prefix / 'rss.xml').getroot().find('channel')
        assert channel is not None and channel.findtext('language') == language
        items = channel.findall('item')
        expected = list((dist / prefix / 'posts').glob('*/index.html'))
        assert len(items) == len(expected), f'RSS count: {language}'
        urls = [item.findtext('link') for item in items]
        assert len(urls) == len(set(urls))
        for url in urls:
            assert local(url) in expected, f'RSS target: {url}'

    # Follow real HTML anchors, as a crawler can, from both landing pages.
    queue = deque([(home, 0), (urljoin(home, 'en/'), 0)])
    seen = {}
    while queue:
        url, depth = queue.popleft()
        path = local(url)
        if path in seen or not path.is_file() or path.suffix != '.html':
            continue
        seen[path] = depth
        for href in Page(path.read_text()).anchors:
            target = urlsplit(urljoin(url, href))
            if target.netloc == urlsplit(home).netloc and target.path.startswith(urlsplit(home).path):
                queue.append((target._replace(query='', fragment='').geturl(), depth + 1))
    depths = [seen.get(local(url)) for url in posts]
    assert all(depth is not None and depth <= 2 for depth in depths), 'Article unreachable within two links'
    print(json.dumps({'articles': len(posts), 'sitemap_urls': len(locations),
                      'rss_languages': 2, 'max_article_depth': max(depths),
                      'canonical_and_hreflang': 'passed', 'site': home}))


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--dist', type=Path, default=Path('dist'))
    parser.add_argument('--site', default='https://blog.vumy.kr')
    parser.add_argument('--base', default='/')
    args = parser.parse_args()
    check(args.dist, args.site, args.base)
