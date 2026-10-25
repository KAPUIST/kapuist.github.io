---
name: "배움의 기록 (임시 이름)"
description: "글 목록 중심의 담백한 학습 노트"
colors:
  ink: "#292f28"
  muted: "#626b5d"
  green: "#3d624c"
  line: "#e0e3d9"
  soft: "#edf0e6"
  page: "#fafaf6"
  code-bg: "#edf0e8"
  code-ink: "#243c2d"
  experiment-bg: "#f8f9f3"
  linear: "#a66b46"
  binary: "#3e644d"
  white: "#fff"
  selection-bg: "#dce6d3"
  selection-ink: "#203c2c"
  scrollbar: "#9ba792"
typography:
  display:
    fontFamily: "'Noto Sans KR Variable', sans-serif"
    fontSize: "clamp(30px, 4.5vw, 44px)"
    fontWeight: 650
    lineHeight: 1.5
    letterSpacing: "-.035em"
  headline:
    fontFamily: "'Noto Sans KR Variable', sans-serif"
    fontSize: "clamp(27px, 4vw, 36px)"
    fontWeight: 650
    lineHeight: 1.55
    letterSpacing: "-.035em"
  title:
    fontFamily: "'Noto Sans KR Variable', sans-serif"
    fontSize: "20px"
    fontWeight: 600
    lineHeight: 1.55
    letterSpacing: "-.025em"
  body:
    fontFamily: "'Noto Sans KR Variable', sans-serif"
    fontSize: "16px"
    lineHeight: 1.95
  code:
    fontFamily: "'SFMono-Regular', Consolas, monospace"
    fontSize: "13px"
    lineHeight: 1.8
rounded:
  focus: "3px"
  inline-code: "4px"
  control: "6px"
  figure: "8px"
  code-block: "10px"
  experiment: "12px"
components:
  reset-button:
    backgroundColor: "{colors.green}"
    textColor: "{colors.white}"
    rounded: "{rounded.control}"
    padding: "11px 20px"
  filter:
    backgroundColor: "transparent"
    textColor: "{colors.muted}"
    rounded: "{rounded.control}"
    padding: "7px 13px"
  filter-selected:
    backgroundColor: "{colors.soft}"
    textColor: "{colors.green}"
    rounded: "{rounded.control}"
    padding: "7px 13px"
  search:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    padding: "10px 0"
    width: "190px"
  experiment:
    backgroundColor: "{colors.experiment-bg}"
    rounded: "{rounded.experiment}"
    padding: "26px"
---

# Design System: 배움의 기록 (임시 이름)

## Overview

**Creative North Star: "담백한 학습 노트"**

현재 로컬 기본 셋업의 구현 기록이다. 사용자 확정 방향은 글 목록 중심의 담백한 학습 노트다. 별도 디자인 시안은 없으며 이름과 소개 문구는 임시다. 새로운 브랜드 원칙을 확정하는 문서는 아니다.

밝은 배경에 짙은 글자, 차분한 녹색 강조를 사용한다. 여백과 얇은 구분선으로 글을 나누고 본문 읽기에 집중한다.

**Key Characteristics:**

- 그림자 없는 평면 구성
- 한국어 본문과 글 목록 중심
- 본문 안에서 값을 바꾸는 작은 실험

## Colors

`green`은 링크, 선택 상태, 강조 문구와 입력 제어에 사용한다. `ink`는 기본 글자, `muted`는 설명과 메타데이터, `line`은 구분선, `soft`는 선택 필터와 인라인 코드 배경이다.

`page`는 전체 배경이다. 코드 블록은 `code-bg`와 `code-ink`, 실험 영역은 `experiment-bg`로 구분한다. 그래프 결과 범례는 `linear`와 `binary`를 사용한다. 두 그래프 색은 별도 브랜드 강조색으로 일반화하지 않는다.

## Typography

본문과 제목은 Noto Sans KR Variable, 코드는 SFMono-Regular와 Consolas 대체 글꼴을 사용한다. 글꼴은 로컬 패키지로 가져온다.

`display`는 첫 화면 제목, `headline`은 글·소개 제목, `title`은 글 목록 제목, `body`는 글 본문이다. 본문 소제목은 h2 (23px, 650, 1.6), h3 (19px)다. 목록 설명은 14px/1.9, 날짜와 본문 메타데이터는 12px, 태그와 예제 표시는 11px다. 날짜·실험 결과는 고정 폭 숫자를 사용한다.

한국어 제목과 설명은 가능한 단어 단위로 줄바꿈한다. 긴 제목과 본문 문자열은 넘치지 않도록 줄바꿈한다.

## Layout

전체 셸은 최대 1024px이며 좌우 여백 48px을 포함한다. 헤더 최소 높이는 102px이다. 첫 화면 소개는 위 78px, 아래 62px 여백을 두며 최대 폭은 670px이다.

글 목록은 날짜·요약·읽기 링크를 `116px 1fr 24px`, 간격 22px으로 배치한다. 각 행은 세로 34px 여백과 아래 구분선을 사용한다. 본문은 최대 740px, 소개 페이지는 최대 690px이다.

640px 이하에서는 셸 좌우 여백이 22px, 헤더 최소 높이가 82px이다. 검색은 한 줄 전체 폭을 차지한다. 글 목록은 `1fr 20px`으로 바뀌고 날짜는 위쪽 한 줄로 이동한다. 제목은 18px, 설명은 13px, 본문은 15px, 본문 h2는 21px이 된다. 표와 코드 블록은 가로 스크롤을 허용한다. 페이지 최소 폭은 320px이다.

## Elevation & Depth

현재 CSS에는 그림자가 없다. 얇은 구분선, 배경 명도 차이와 여백으로 영역을 구분한다. 별도 전환·애니메이션 토큰도 없다. 동작 줄이기 설정에서는 전환과 애니메이션을 끈다.

## Shapes

글 목록은 카드 테두리로 감싸지 않은 행이다. 필터와 버튼은 작은 둥근 모서리, 인용·이미지는 중간 둥근 모서리, 코드·실험은 더 큰 둥근 모서리를 사용한다. 정확한 반지름은 frontmatter를 따른다. 구분선과 실험 테두리는 1px이다.

## Components

- **탐색:** 글 / 이 블로그 링크. 기본은 보조 글자색, 현재 페이지는 녹색과 밑줄이다. 키보드 포커스는 녹색 2px 외곽선과 5px 간격으로 표시한다.
- **검색:** 투명 배경의 검색 입력이다. 포커스에서 녹색 아래 선과 아이콘 색을 표시한다. 접근 가능한 이름은 ‘글 검색’이다.
- **필터:** 선택은 `aria-pressed`와 부드러운 배경으로 표현한다. hover에서 녹색 글자와 구분선색 테두리를 표시한다.
- **글 행:** 날짜·분류, 예제 여부, 제목, 설명, 태그, 읽기 화살표로 구성한다. 제목 hover는 녹색과 밑줄이다. 샘플은 ‘예제 글’로 표시한다.
- **빈 결과:** 설명과 ‘전체 글 보기’ 버튼을 제공한다. 버튼은 녹색 배경과 흰 글자다. 별도 hover 색은 현재 정의하지 않았다.
- **글 본문:** 인라인 코드, 가로 스크롤 코드·표, 테두리 인용, 반응형 이미지와 캡션을 지원한다. 코드 블록 안에는 인라인 코드 배경을 중복하지 않는다.
- **실험과 그래프:** 실험 상자는 데스크톱 26px, 모바일 `16px 12px` 패딩이다. 슬라이더는 전체 폭과 최소 높이 32px, 녹색 강조를 사용한다. 그래프 영역 높이는 280px, 모바일은 240px이다. 결과 범례에는 8px 원형 색 표시와 이름, 숫자를 함께 둔다. 결과 숫자는 20px/600이다. 이 기록은 App.css에서 확인한 외곽 구성과 범례 규칙이며 그래프 내부 축·선 구현은 포함하지 않는다.

## Do's and Don'ts

### Do:

- **Do** 글 목록과 본문의 읽기 위계를 유지한다.
- **Do** 선택 상태와 그래프 결과를 글자로도 표시한다.
- **Do** 예제 글을 실제 경험이나 측정 결과와 구분한다.

### Don't:

- **Don't** 임시 이름과 소개 문구를 확정된 브랜드 사실로 기록한다.
- **Don't** 현재 구현 기록에 없는 그림자, 색상 단계, 동작을 기존 규칙으로 추가한다.
