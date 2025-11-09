# EPL API Specification (v1)

> 프런트엔드 계약 정의는 `src/shared/api/epl/model/types.ts`를 참고하세요.

## Base URL

- Production: `https://infootball.kr/api/v1`
- Preview/Sandbox: 동일 구조 사용, 도메인만 변경

## Meta

- 모든 응답은 `data` 필드와 선택적 `meta` 필드를 포함
- 타임스탬프는 UTC 기준 UNIX epoch milliseconds (예: `1761658021894`)로 전달
- 공통 쿼리 파라미터:
  - `season` (`string`, 예: `"2024-25"`)
  - `locale` (`string`, 예: `"ko-KR"`)

## Endpoints

### 1. 팀 정보

- `GET /api/v1/teams`
  - Query
    - `leagueId` (`string`, optional) – 특정 리그 팀만 조회
    - `search` (`string`, optional) – 팀명/약어/도시 검색
  - Response: `TeamsInfoResponse`

### 2. 리그 메타데이터

- `GET /api/v1/leagues/{leagueId}/metadata`
  - Query
    - `season`
    - `locale`
  - Response: `LeagueMetadataResponse`

### 3. 리그 순위표 (공용)

- `GET /api/v1/leagues/{leagueId}/standings`
  - Query
    - `season`
    - `locale`
    - `includeAdvanced` (`boolean`, default: `false`) – `true`일 때 `advancedMetrics` 필드가 채워진 순위 데이터를 반환
  - Response: `LeagueStandingsResponse`
    - `advancedMetrics`는 `includeAdvanced=true`일 때만 포함되며, 각 팀의 xG, 점유율, 패스 성공률 등의 확장 지표를 제공

### 4. 허브 개요 (홈)

- `GET /api/v1/leagues/{leagueId}/hub-overview`
  - Query
    - `season`
    - `locale`
    - `limitFixtures` (`number`, default: `3`)
    - `limitRankings` (`number`, default: `5`)
  - Response: `HubOverviewResponse`

### 5. 리그 Pulse 지표

- `GET /api/v1/leagues/{leagueId}/meta`
  - Query
    - `season`
    - `locale`
  - Response: `LeagueMetaResponse`

### 6. 선수 랭킹

- `GET /api/v1/leagues/{leagueId}/player-rankings`
  - Query
    - `season`
    - `locale`
    - `category` (`"top-scorers" | "form" | "assists"`, default: `"top-scorers"`)
    - `limit` (`number`, default: `10`)
  - Response: `PlayerRankingResponse`

### 7. 경기 일정

- `GET /api/v1/leagues/{leagueId}/schedule`
  - Query
    - `season`
    - `locale`
    - `matchweek` (`number`, optional) – 특정 라운드만 조회
    - `includeFinished` (`boolean`, default: `true`)
    - `includeAnalytics` (`boolean`, default: `true`)
  - Response: `MatchScheduleResponse`

### 8. 경기 상세

- `GET /api/v1/matches/{matchId}`
  - Query
    - `locale`
  - Response: `MatchDetailResponse`

### 9. 선수 데이터베이스

- `GET /api/v1/leagues/{leagueId}/players/database`
  - Query
    - `season`
    - `locale`
    - `teamId` (`string`, optional)
    - `position` (`string`, optional)
    - `search` (`string`, optional)
    - `ageMin` (`number`, optional)
    - `ageMax` (`number`, optional)
  - Response: `PlayerDatabaseResponse`

### 10. 팀 프로필 & 스쿼드

- `GET /api/v1/leagues/{leagueId}/teams/profiles`

  - Query
    - `season`
    - `locale`
    - `search`
  - Response: `TeamProfilesResponse`

- `GET /api/v1/teams/{teamId}/squad`
  - Query
    - `season`
    - `locale`
  - Response: `TeamSquadResponse`

### 11. 프리미엄 테이블

- `GET /api/v1/leagues/{leagueId}/premium-table`
  - Query
    - `season`
    - `locale`
    - `includeAnalytics` (`boolean`, default: `true`)
  - Response: `PremiumTableResponse`

### 12. 뉴스 목록

- `GET /api/v1/leagues/{leagueId}/news`
  - Query
    - `cursor` (`string`, optional) – 커서 기반 페이지네이션
    - `limit` (`number`, default: `10`)
    - `categoryId` (`string`, optional)
    - `teamId` (`string`, optional)
    - `tagIds` (`string[]`, optional)
    - `search` (`string`, optional)
    - `locale`
    - `includeFeatured` (`boolean`, optional)
  - Response: `NewsListResponse`
    - `meta.pagination`에 `nextCursor`, `hasNext` 등 페이징 정보 포함

### 13. 뉴스 상세

- `GET /api/v1/leagues/{leagueId}/news/{slug}`
  - Query
    - `locale`
    - `includeRelated` (`boolean`, default: `false`) – 관련 기사 목록 포함 여부
  - Response: `NewsArticleResponse`
    - `data.body`는 `NewsArticleBlock[]` 형태 (문단, 이미지, 리스트 등)

### 14. 뉴스 하이라이트

- `GET /api/v1/leagues/{leagueId}/news/highlights`
  - Query
    - `limit` (`number`, default: `3`)
    - `categoryId` (`string`, optional)
    - `locale`
  - Response: `NewsHighlightsResponse` (`NewsArticlePreview[]`)

### 15. 관련 뉴스

- `GET /api/v1/leagues/{leagueId}/news/{slug}/related`
  - Query
    - `limit` (`number`, default: `4`)
    - `categoryId` (`string`, optional) – 특정 카테고리 강제
    - `excludeIds` (`string[]`, optional) – 중복 제외용
    - `locale`
  - Response: `NewsRelatedResponse`
    - `meta.articleId`와 `meta.generatedAt` 포함

## Error Handling

- 비정상 응답은 HTTP status code와 함께 JSON 본문을 포함
  ```json
  {
    "message": "설명",
    "code": "optional_error_code",
    "details": {}
  }
  ```
