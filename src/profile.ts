import resumeUrl from './assets/kapuist-resume.pdf?url'

export const profile = {
  name: 'KAPUIST',
  role: '백엔드 개발자',
  bio: 'TypeScript와 NestJS로 백엔드를 개발합니다. 주문·결제, 로봇 배송, 예약 서비스를 만들었고, 현재는 AI 문항 생성·검수 시스템을 개발하고 있습니다.',
  githubUrl: 'https://github.com/KAPUIST',
  resume: {
    url: resumeUrl,
    filename: 'KAPUIST-resume.pdf',
    label: 'PDF · 6쪽 · 이력서와 경력기술서',
  },
  experience: [
    {
      company: 'Curea',
      period: '2026.07 — 현재',
      role: '백엔드 개발',
      summary: 'AI 문항 생성·검수 서비스 QGen과 시험지 PDF 구조화, 문제집 제작 도구를 개발하고 있습니다.',
    },
    {
      company: '올리브랩스',
      period: '2024.09 — 2026.06',
      role: '백엔드 개발 · 2025.04 정규직 전환',
      summary: 'Caravel 주문·결제 시스템의 핵심 백엔드를 설계·구축했습니다. Watt 로봇 배송 서버와 Knotwork 회의실 예약 서비스도 개발했습니다.',
    },
    {
      company: '팀스파르타',
      period: '2024.09 — 2025.03',
      role: '내일배움캠프 Node.js 7기 APM · 겸직',
      summary: '교육 과정 운영과 수강생 기술 질의응답, 개별 멘토링을 지원했습니다.',
    },
    {
      company: '오즈랩스',
      period: '2022.06 — 2023.04',
      role: '백엔드 개발',
      summary: '해외 온라인 게임 플랫폼의 제휴사 정산 관리 시스템과 CRM 백오피스를 ASP.NET·Vue로 개발·유지보수했습니다.',
    },
  ],
  skills: 'TypeScript · JavaScript · Node.js · NestJS · TypeORM · PostgreSQL · Redis · SQLite · Socket.IO · MQTT · AWS · Docker',
  openSource: 'NestJS와 관련 생태계(CLI, Schematics, Docs), Orca에 기여했습니다.',
}
