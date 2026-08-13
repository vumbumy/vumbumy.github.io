# 문제를 푸는 일

매일 남긴 업무 메모를 AI로 정리해, 기술과 조직에 걸친 문제를 풀어간 과정을 회고하는 Astro 기반 정적 블로그입니다. 회사와 개인을 식별할 수 있는 정보는 공개 전에 제거합니다.

## 로컬 실행

```bash
npm install
npm run dev
```

## 글 작성

한국어 글은 `src/content/posts`, 같은 글의 영문판은 `src/content/posts-en`에 동일한 파일명으로 추가합니다. 영문판은 IELTS 5 수준의 평이한 어휘와 짧은 문장을 기준으로 작성합니다. 공개 전에는 반드시 `draft: true`를 유지하고, 민감정보 검토가 끝난 글만 `draft: false`로 바꿉니다.

필수 공개 전 점검:

- 회사·고객·직원 이름 및 식별 가능한 표현 제거
- 내부 도메인, IP, 계정, 토큰, 구체적 네트워크 구성 제거
- 장애 시각, 비용, 계약, 미공개 프로젝트 정보 일반화
- 사례를 통해 특정 개인이나 조직을 추정할 수 없는지 확인

## GitHub Pages

저장소의 Settings → Pages → Source를 `GitHub Actions`로 지정합니다. 기본 `master` 브랜치에 푸시하면 워크플로가 계정 사이트와 프로젝트 사이트 경로를 자동 판별해 빌드합니다.

SEO 기본 구성에는 언어별 canonical과 hreflang, Open Graph, Twitter Card, BlogPosting JSON-LD, sitemap, robots.txt가 포함됩니다. 한국어는 기본 URL, 영문은 `/en/` 아래에 배포됩니다.

## 검색·유입 분석

GitHub 저장소의 `Settings → Secrets and variables → Actions → Variables`에 다음 값을 등록하면 빌드 시 분석 기능이 활성화됩니다.

- `GA_MEASUREMENT_ID`: GA4 웹 데이터 스트림의 측정 ID (`G-`로 시작)
- `GOOGLE_SITE_VERIFICATION`: Search Console에서 제공한 HTML 메타태그의 `content` 값

값이 없으면 관련 메타태그와 스크립트는 생성되지 않습니다. GA4가 활성화되면 기본 페이지 조회와 함께 `vumy.kr` 링크 클릭을 `service_link_click` 이벤트로 기록합니다. Search Console에는 `https://blog.vumy.kr/sitemap-index.xml`을 제출합니다.
