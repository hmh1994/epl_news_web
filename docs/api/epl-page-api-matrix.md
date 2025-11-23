# EPL 페이지별 API 매트릭스

## 홈 (Home)

| 영역 | 사용 API | 비고 |
| --- | --- | --- |
| 허브 개요 카드/섹션 | `GET /api/v1/leagues/{leagueId}/hub-overview` | 스탠딩, 추천 경기, 랭킹, 메타 지표를 한 번에 수집 |
| Pulse/리그 메타 타일 | `GET /api/v1/leagues/{leagueId}/meta` | KPI 카드/게이지 등 |
| 뉴스 하이라이트 | `GET /api/v1/leagues/{leagueId}/news/highlights` | 홈 상단 하이라이트 슬라이더 |

## 리그 페이지

| 영역 | 사용 API | 비고 |
| --- | --- | --- |
| 순위표 | `GET /api/v1/leagues/{leagueId}/standings` | 기본 순위, Advanced metrics 토글 |
| 메타데이터/히스토리 | `GET /api/v1/leagues/{leagueId}/metadata` | 요약, 챔피언, 성공 클럽 리스트 |
| 프리미엄 테이블 | `GET /api/v1/leagues/{leagueId}/premium-table` | valueBands, formGuide 등 부가 분석 |

## 경기 (Matches)

| 영역 | 사용 API | 비고 |
| --- | --- | --- |
| 일정 / 라운드별 뷰 | `GET /api/v1/leagues/{leagueId}/schedule` | matchweek/analytics 옵션 포함 |
| 경기 상세 | `GET /api/v1/matches/{matchId}` | 히어로, 타임라인, 스탯 |

## 팀 탐색 & 상세

| 영역 | 사용 API | 비고 |
| --- | --- | --- |
| 팀 탐색 리스트/검색 | `GET /api/v1/leagues/{leagueId}/teams` | 사이드바/자동완성에 사용 |
| 팀 상세 Hero & Key Stats | `GET /api/v1/leagues/{leagueId}/teams/profiles` | 확장 팀 정보 + 필터 옵션 |
| 스쿼드 탭/포지션 분포 | `GET /api/v1/leagues/{leagueId}/teams/{teamId}/squad` | 선수 목록, 포지션 통계 |

## 선수 (Players)

| 영역 | 사용 API | 비고 |
| --- | --- | --- |
| 랭킹(득점/폼/도움) | `GET /api/v1/leagues/{leagueId}/player-rankings` | 홈 위젯 + 랭킹 페이지 |
| 선수 데이터베이스/검색 | `GET /api/v1/leagues/{leagueId}/players/database` | 필터, 검색, 비교 기능 기반 |

## 뉴스 (News)

| 영역 | 사용 API | 비고 |
| --- | --- | --- |
| 뉴스 목록/피드 | `GET /api/v1/leagues/{leagueId}/news` | 커서 기반 pagination |
| 뉴스 상세 | `GET /api/v1/leagues/{leagueId}/news/{slug}` | 본문, SEO, 관련 기사 포함 |
| 하이라이트 리스트 | `GET /api/v1/leagues/{leagueId}/news/highlights` | 홈/뉴스 탭 하이라이트 |
| 관련 기사 | `GET /api/v1/leagues/{leagueId}/news/{slug}/related` | 상세 하단 관련 기사 |

## 비교/분석 기능

| 영역 | 사용 API | 비고 |
| --- | --- | --- |
| 팀 비교 | `GET /api/v1/leagues/{leagueId}/teams/profiles` + `GET /api/v1/leagues/{leagueId}/teams/{teamId}/squad` | 기본 정보 + 선수 데이터 |
| 선수 비교 | `GET /api/v1/leagues/{leagueId}/players/database` + `GET /api/v1/leagues/{leagueId}/player-rankings` | 필터된 후보 + 주요 지표 |
