# 유입과 읽기 측정

LinkedIn 글 공유에는 `docs/linkedin-share-links.csv`의 URL을 사용한다.
`node scripts/generate-share-links.mjs`로 공개 글의 링크 목록을 갱신한다.
source=linkedin, medium=social, campaign=글별 고정 slug, content=post-01이다.
같은 글의 소개 문구를 달리 공유하면 content만 post-02 등으로 바꾼다.
사이트 내부 링크에는 UTM을 붙이지 않는다. 링크드인 게시 자체는 사람이 한다.

## 수집 이벤트

- featured_article_click: 홈의 ‘먼저 읽을 글’
- recent_article_click: 홈의 최근 글
- related_article_click: 본문 아래 관련 글
- adjacent_article_click: 이전/다음 글
- archive_article_click: 아카이브의 글
- body_article_click: 본문에서 다른 글로 이동
- article_link_click: 그 외 내부 글 링크
- service_link_click: 프로필·프로젝트 이동 (기존 이벤트 유지)
- article_read: 해당 페이지에서 활성 화면 60초 이상 + 본문 75% 이상 도달

읽기 신호는 페이지당 한 번이며 숨겨진 탭·포커스가 없는 창의 시간은 제외한다.
스크롤은 본문 영역을 기준으로 한다. 시간 또는 스크롤만으로는 발생하지 않는다.
이미 읽은 내용을 되짚는 시간도 포함될 수 있어 완독·이해·성과로 해석하지 않는다.
내부 클릭 역시 실제 목적지 열람 완료를 뜻하지 않는다. 목적지 page_view와 함께 본다.

source_path, target_path, link_placement, content_language를 전달한다. 읽기 신호에는
active_seconds, scroll_percent, reading_rule을 전달한다. 내부 이벤트에 URL 쿼리,
사용자명, 문서 본문, 개인 식별자를 추가하지 않는다. GA 기본 페이지뷰와 UTM 수집은 유지한다.

이벤트 종류별 건수와 페이지별 건수는 GA4 기본 eventName/pagePath 차원으로 조회한다.
추가 매개변수를 GA 탐색에서 나누어 보려면 GA 관리에서 해당 맞춤 정의를 별도 등록해야 한다.
맞춤 정의는 자동 등록하지 않았다. 표준 보고서 처리에는 시간이 걸릴 수 있다.

## 비교

추가 전에는 새 이벤트가 존재하지 않았으므로 0건을 성과 하락으로 해석하지 않는다.
배포 후 2~4주간 공유별 방문과 참여, 읽기 신호, 내부 글 클릭, 프로필 이동을 함께 본다.
사용자 수가 적으면 비율보다 실제 건수와 표본 크기를 먼저 적는다.
본인·검수 방문은 섞일 수 있다. 자동 브라우저 검수는 GA 요청을 차단한다.

## 색인 요청

일반 블로그 글의 색인 요청은 Search Console 웹의 ‘URL 검사 → 색인 생성 요청’에서 한다.
URL Inspection API는 색인 상태 조회용이다. 일반 글에 채용·방송용 Indexing API를 쓰지 않는다.
우선 확인할 글은 배포 권한, AI 검증, 11월 6일 서비스 운영 전환, 11월 8일 의사결정 글이다.
사이트맵과 내부 링크는 그대로 유지한다. 색인 요청이 실제 색인을 보장하지는 않는다.
