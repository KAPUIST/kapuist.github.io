# KAPUIST

React + Vite + TypeScript로 만든 개인 블로그입니다. 글은 MDX로 작성하고, 필요한 글에 React 컴포넌트와 ECharts 그래프를 넣습니다.

## 실행

Node.js 24 LTS와 npm을 사용합니다. `.nvmrc`가 포함되어 있습니다.

```sh
npm ci
npm run dev
```

터미널에 표시되는 Local 주소를 엽니다. 종료는 Ctrl+C입니다.

```sh
npm run build    # TypeScript 검사 후 dist 생성
npm run preview  # 빌드 결과 확인
npm run lint    # 코드 정적 검사
```

## 새 글 작성

1. `templates/post.mdx`를 `src/posts/my-first-note.mdx`로 복사합니다.
2. `meta`의 slug, 제목, 설명, 날짜, 분류, 태그를 수정합니다. slug는 영문 소문자·숫자·하이픈으로 된 고유한 값으로 사용합니다.
3. 본문을 작성합니다. 파일을 저장하면 글 목록에 자동으로 나타납니다.
4. 예제 글을 자신의 글로 바꿀 때 `example: true`를 지우고, 샘플 안내 인용문도 삭제합니다.

글은 날짜 내림차순으로 정렬합니다. 현재 두 글은 샘플이며 실제 작성자의 경험이나 성과를 나타내지 않습니다.

## 이미지와 코드

이미지는 `src/assets/`에 저장하고 MDX에서 import합니다. 이 방법은 GitLab Pages의 하위 경로에서도 동작합니다.

```mdx
import picture from '../assets/my-picture.png'

<img src={picture} alt="이미지가 설명하는 내용" loading="lazy" />
```

코드는 일반 Markdown 코드 블록으로 작성합니다. 표, 목록, 링크를 지원합니다. 현재 코드 블록은 단색 표시이며 구문 강조는 추가하지 않았습니다. 래스터 이미지 자동 리사이즈·압축도 아직 없으므로 업로드 전 적절한 크기로 줄여 주세요.

## 인터랙티브 예제

`src/posts/search-complexity.mdx`를 참고합니다. `InteractiveSearch`가 필요한 때에만 ECharts 코드를 로드합니다. 실제 성능 측정과 이론값을 구분해서 설명해 주세요.

## 이름과 소개 수정

- `src/site.ts`: 블로그 이름
- `src/pages/AboutPage.tsx`: About Me 페이지
- `src/profile.ts`: 소개, GitHub URL, 경력 요약과 다운로드 정보
- `src/pages/BlogPage.tsx`: 메인 글 목록
- `src/assets/profile.png`: 사용자 지정 프로필 사진
- `index.html`: 초기 페이지 제목과 설명
- `src/index.css`, `src/App.css`: 스타일

## 이력서 업데이트

About Me는 2026-10-22 최종 이력서를 요약했습니다. 다운로드는 원본 6쪽 PDF(이력서와 경력기술서)를 제공합니다. `src/assets/kapuist-resume.pdf`를 교체하고 `src/profile.ts`의 경력 요약도 수정하세요. 요약은 PDF와 자동 동기화되지 않습니다.

## GitLab Pages

이번 셋업은 로컬 전용입니다. 원격 저장소, GitLab CI, 배포는 아직 연결하지 않았습니다.

`base: './'`와 `HashRouter`를 사용하므로 `/블로그경로/#/posts/글-slug` 형태로 동작합니다. 실제 배포 시 GitLab 프로젝트와 공개 범위를 정하고, CI가 `npm ci`와 `npm run build`를 실행한 뒤 `dist`를 Pages 산출물로 게시하도록 구성하면 됩니다.

현재는 SPA입니다. 글별 검색 노출·링크 미리보기·RSS·사이트맵·사전 렌더링은 구현하지 않았습니다. 공개 배포 전에 필요한 범위를 정하세요.

## 파일 구조

```text
src/posts/       MDX 글과 메타데이터
src/assets/      글 이미지
src/components/  글에서 사용하는 React 예제
src/content.ts   글 자동 수집
src/site.ts      블로그 이름
src/pages/       글 목록과 About Me
src/profile.ts   개인 소개와 링크
templates/       새 글 템플릿
```

## 초기 검증과 알려진 제한

TypeScript/프로덕션 빌드와 정적 검사를 통과했습니다. Edge에서 글 목록, 주제 필터, 빈 검색 결과와 초기화, 글 열기·새로고침, 그래프 슬라이더를 확인했습니다. 390px 너비의 iframe에서 목록과 본문 레이아웃도 확인했습니다. 실기기 검증은 하지 않았습니다.

그래프 코드는 엔진 약 320kB, 렌더러 약 182kB, 화면 코드 약 3kB(압축 전)로 분리했습니다. 기본 빌드 용량 경고 기준을 유지하며 경고 없이 빌드됩니다. 전체 다운로드 용량을 줄인 변경은 아니며, 각 파일을 별도로 캐시할 수 있습니다. 첫 화면에서는 그래프 코드를 로드하지 않습니다. 글과 이미지가 많아지면 글 단위 지연 로딩, 이미지 최적화, 사전 렌더링을 검토하세요.
