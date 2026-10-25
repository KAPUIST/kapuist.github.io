# Issue tracker: GitHub

대상 저장소: KAPUIST/kapuist.github.io
이슈와 명세는 GitHub Issues에서 관리하며 gh CLI를 사용한다.

조회는 gh issue view/list로 수행한다.
이슈 생성과 외부 변경은 사용자가 승인한 범위에서 수행한다.
여러 줄 본문은 파일로 작성하고 --body-file로 전달한다.

스킬이 티켓을 요청하면 해당 GitHub 이슈를 읽는다.
스킬이 명세 게시를 요청하면 승인 범위를 확인하고 이슈를 생성한다.

PRs as a request surface: no.
