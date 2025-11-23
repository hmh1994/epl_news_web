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

## 실제 응답과의 차이점 노트 (2025-11-23 갱신)

> `https://infootball.kr/openapi.json`에 명시된 스키마와 `curl`로 수집한 실제 응답이 달라, 누락 정보와 필드 차이를 아래 표로 정리했습니다. Database 태그 엔드포인트는 제외했습니다.

| 구분 | 문서/타입 정의 | 실제 응답 (`curl`) | 누락·차이 상세 |
| --- | --- | --- | --- |
| 공통 패턴 | 모든 리소스는 `{ data, meta }` 래핑을 사용하고 `meta`는 `season`, `leagueId`, `locale`, `lastUpdated` 등을 포함한다고 명시 | 모든 엔드포인트가 루트에 `teams`/`players` 등의 컬렉션을 그대로 노출하고 선택적으로 `meta`만 병행. `meta`도 `lastUpdated`, `locale`이 비어 있는 경우가 많음 | 결과적으로 `ApiListResponse`/`ApiResourceResponse` 타입과 맞지 않아 프런트에서 수동 맵핑이 필요. |
| `GET /api/v1/teams` (문서) vs `GET /api/v1/leagues/{leagueId}/teams` (실제) | `TeamsInfoResponse` → `{ data: TeamSummary[]; meta: { total; season?; locale?; ... } }`<br>`TeamSummary`: `id`, `name`, `shortName`, `crest`, `city?`, `stadium?` | `curl https://infootball.kr/api/v1/leagues/epl/teams?locale=en-US` → `{ "teams": [{ "id": "...", "name": "...", "shortName": "...", "city": "...", "stadium": "..." }], "meta": { "season": "...", "leagueId": "...", "leagueName": "epl", "locale": "en-US", "total": 20 } }` | ① 경로가 `leagues/{leagueId}` 하위로 바뀜 ② `data` 래핑 없음 ③ `crest` 필드 미제공 ④ `meta.lastUpdated` 없음 |
| `GET /api/v1/leagues/{leagueId}/teams/profiles` | `TeamProfilesResponse` → `{ data: { teams: TeamProfile[]; filters: { positions: PlayerPosition[] } }; meta: { leagueId; season; lastUpdated; ... } }`<br>`TeamProfile`은 숫자 `id`, `colors.primary/secondary`, `form`, `avgAge`, `trophies`, `description`, `keyStats.possession/passAccuracy/shotsPerGame/cleanSheets`, `nationality` 등을 포함하며 이 값들은 `팀 프로필 페이지 > Hero/Key Stats`에 직접 연결됨 | `{ "teams": [{ "id": "uuid", "nameEn", "nameKr", "shortNameEn", "shortNameKr", "logo", "founded", "stadiumEn", "stadiumKr", "capacity", "rank", "managerEn/Kr", "points", ... }], "meta": { "season": "...", "leagueId": "...", "leagueName": "epl" } }` | ① `data`/`filters` 래핑 없음 ② 위 확장 필드/필터가 존재하지 않아 `팀 프로필` UI와 연결 불가 ③ `filters` 자체가 빠짐 ④ `meta`에 `lastUpdated`/`locale`이 없음 |
| `GET /api/v1/teams/{teamId}/squad` (문서상) vs 실제 `GET /api/v1/leagues/{leagueId}/teams/{teamId}/squad` | `TeamSquadResponse` → `{ data: { team: TeamProfile; squad: PlayerProfile[] }; meta: { teamId; season; lastUpdated; ... } }`<br>`TeamProfile`은 위와 동일한 확장 필드를 포함하고, `PlayerProfile`은 숫자 `id`, `position`(고정 enum: `GK`, `CB` …), `rating`, `nationalityName`, `teamId`, `appearances`, `goals/assists` 등을 포함 (모두 `팀 상세 > 스쿼드 테이블`에서 사용) | `{ "team": { TeamProfiles 응답과 동일 구조 }, "squad": [{ "id": "uuid", "nameEn", "nameKr", "age": 33, "nationalityEn/Kr", "position": "GOALKEEPER", "number": 1, "goals": 0, "assists": 0, "appearances": 1 }], "meta": { "season": "...", "leagueId": "...", "leagueName": "epl", "teamId": "uuid" } }` | ① 엔드포인트 경로 다름 ② `data` 래핑 없음 ③ `team` 객체가 위 필드들을 제공하지 않음 ④ `squad` 항목에 `rating`, `teamId`, `nationalityName` 부재 ⑤ `position` 값이 `"GOALKEEPER"`/`"MIDFIELDER"` 등으로 enum 미스매치 ⑥ `meta.lastUpdated` 없음 |
| `GET /api/v1/leagues/{leagueId}/standings` | `LeagueStandingsResponse` → `{ data: LeagueStandingsRow[]; meta: { leagueId; leagueName; season; lastUpdated; locale } }`<br>`LeagueStandingsRow`는 `team`, `position`, `record{played~points}`, `form`, `trend?`, `advancedMetrics?` | `{ "leagueStandingsRow": [{ "teamSummary": { ... }, "record": { "rank": 1, "played": 11, ... } }], "meta": { "leagueId": "...", "leagueName": "epl", "season": "..." } }` | ① 컬렉션 키가 `leagueStandingsRow` 및 `teamSummary`로 다름 ② `position`이 `record.rank` 안으로 들어감 ③ `form`, `trend`, `advancedMetrics` 전혀 제공되지 않음 ④ `meta`에 `lastUpdated`, `locale` 없음 |
| `GET /api/v1/leagues/{leagueId}/metadata` | `LeagueMetadataResponse` → `{ data: { summary: LeagueSummary; overviewStats: LeagueStat[]; highlightMetrics: HighlightLeagueStat[]; champions: LeagueChampion[]; successfulClubs: SuccessfulClub[] }; meta: { leagueId; season } }` | `{ "summary": { "name": "Premier League", "logo": "..." }, "champions": [], "successfulClubs": [], "meta": { "leagueId": "...", "leagueName": "epl", "seasonId": "...", "locale": "en-US" } }` | ① `data` 래핑 부재 ② `overviewStats`, `highlightMetrics` 필드 자체 미제공 ③ `summary` 구조가 최소 필드만 포함 ④ `meta.season` 대신 `seasonId` 사용 및 `lastUpdated` 없음 |
| `GET /api/v1/leagues/{leagueId}/meta` | `LeagueMetaResponse` → `{ data: LeagueMetaMetric[] }`, 각 항목은 `id`, `label`, `value`, `description?`, `icon` | `{ "leagueMetaMetric": { "id": "...", "description": "...", "icon_url": "..." }, "meta": { "season": "...", "leagueId": "...", "leagueName": "epl", "locale": "en-US" } }` | ① 배열이 아닌 단일 객체 반환 ② `label`, `value` 필드 없음 ③ `icon` 대신 `icon_url` 사용 ④ `meta.lastUpdated` 없음 |
| `GET /api/v1/leagues/{leagueId}/player-rankings` | `PlayerRankingResponse` → `{ data: PlayerRanking[]; meta: { leagueId; season; category; source; locale } }`<br>`PlayerRanking`은 `avatar`, `rating` 등 필수 | `{ "players": [{ "name": "Chris Wood", "teamId": "uuid", "goals": 2, "assists": 0, "ranking": 1 }], "meta": { "leagueId": "...", "season": "...", "category": "top-scorers" } }` | ① `data` 래핑 없음 ② `avatar`, `rating` 필드 미제공 ③ `meta.source`, `meta.locale` 부재 |
| `GET /api/v1/leagues/{leagueId}/players/database` | `PlayerDatabaseResponse` → `{ data: { players: PlayerDatabaseEntry[]; filters: PlayerFilters }; meta: { leagueId; season; lastUpdated } }`<br>`PlayerDatabaseEntry`는 숫자 `id`, `PlayerSkillSet`, 풍부한 `career` 데이터, `position`은 `PlayerPosition` union | `{ "players": [{ "id": "uuid", "name": "...", "photo": "...", "teamId": "uuid", "position": "DEFENDER", "age": 31.0, "nationality": "...", "height": 183, "weight": 73, "goals": 0, "assists": 0, "stats": {}, "career": [] }], "filters": { "positions": "{GOALKEEPER,MIDFIELDER,FORWARD,DEFENDER}", "teamIds": ["uuid", ...], "nationalities": [...], "ageRange": { "min": 15, "max": 40 } }, "meta": { "season": "...", "leagueId": "...", "leagueName": "epl" } }` | ① `data` 래핑 없음 ② `players[].id`가 문자열(문서상 number) ③ `position` 값이 enum(`GK`, `CB` …)과 불일치 ④ `stats`가 빈 객체, `career` 빈 배열로 스키마 미충족 ⑤ `filters.positions`가 문자열 한 줄이며 배열이 아님 ⑥ `meta.lastUpdated`/`locale` 없음 |
| 문서에만 존재 (실제 미확인) | `/hub-overview`, `/schedule`, `/matches/{matchId}`, `/premium-table`, `/news/*` 등 다수 엔드포인트가 문서/타입으로는 정의되어 있음 | `openapi.json` 및 실서버에서 위 엔드포인트가 노출되지 않거나 호출 시 404/정의 없음 (테스트 불가) | 클라이언트 코드가 해당 경로를 사용할 경우 사전 협의 필요. 실제 스키마가 존재하지 않으므로 검증/동기화 필요 |

### 클라이언트 정규화 참고

- 실서비스 응답이 `{ data, meta }` 구조를 따르지 않는 경우가 많아, 프런트 클라이언트(`src/shared/api/epl/lib/*.ts`)는 호출 직후 `normalize*Response` 계층에서 응답을 재래핑하고 필수 필드를 보정합니다.
- `teams/profiles`/`teams/{teamId}/squad`는 각 항목을 로컬 mock(`TEAM_PROFILES`, `TEAM_PLAYERS`)과 매칭해 누락된 값(예: `keyStats`, `avgAge`, `nationality`)을 채운 뒤 UI에 전달합니다.
- 백엔드 스키마가 업데이트되면 이 정규화 계층도 함께 수정해야 하며, 신규 필드를 추가할 때는 문서와 `normalize*Response`를 동기화하세요.
