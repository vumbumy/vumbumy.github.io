# Hanbeom의 작업 노트

일하면서 해결해야 했던 과제와 풀어간 과정을 회고하는 Astro 기반 정적 블로그입니다. 회사와 개인을 식별할 수 있는 정보는 공개 전에 제거합니다.

## 로컬 실행

```bash
npm install
npm run dev
```

## 글 작성

`src/content/posts`에 Markdown 파일을 추가합니다. 공개 전에는 반드시 `draft: true`를 유지하고, 민감정보 검토가 끝난 글만 `draft: false`로 바꿉니다.

필수 공개 전 점검:

- 회사·고객·직원 이름 및 식별 가능한 표현 제거
- 내부 도메인, IP, 계정, 토큰, 구체적 네트워크 구성 제거
- 장애 시각, 비용, 계약, 미공개 프로젝트 정보 일반화
- 사례를 통해 특정 개인이나 조직을 추정할 수 없는지 확인

## GitHub Pages

저장소의 Settings → Pages → Source를 `GitHub Actions`로 지정합니다. 기본 `master` 브랜치에 푸시하면 워크플로가 계정 사이트와 프로젝트 사이트 경로를 자동 판별해 빌드합니다.

SEO 기본 구성에는 canonical, Open Graph, Twitter Card, BlogPosting JSON-LD, sitemap, robots.txt, RSS가 포함됩니다.
