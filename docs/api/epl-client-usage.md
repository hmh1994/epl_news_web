# EPL Frontend API Usage Guide

`src/shared/api/epl/lib` 이하에 정의된 클라이언트 헬퍼는 [`docs/api/epl-api-spec.md`](./epl-api-spec.md)에 기재된 백엔드 스펙을 그대로 래핑합니다. 이 문서는 **어떤 헬퍼가 어떤 요청을 만들고, 어디서 사용되고 있는지**를 한눈에 확인할 수 있도록 정리했습니다.

> 표기 규칙  
> - `Unused` : 현재 코드베이스 어디에서도 임포트되지 않음 (주로 목 데이터로 화면이 구성되어 있음)  
> - `RequestOptions` : 모든 헬퍼에 공통으로 전달 가능 (`cache`, `signal`, `headers`)

## League APIs (`src/shared/api/epl/lib/league.ts`)

| Function | Method & Path | Key Params | Response Type | Used By |
| --- | --- | --- | --- | --- |
| `fetchLeagueMetadata` | `GET /api/v1/leagues/{leagueId}/metadata` | `season`, `locale` | `LeagueMetadataResponse` | `app/[locale]/(root)/league/page.tsx` → `LeagueOverviewPage` |
| `fetchLeagueStandings` | `GET /api/v1/leagues/{leagueId}/standings` | `season`, `locale`, `includeAdvanced` | `LeagueStandingsResponse` | Unused (hub & table 화면은 다른 엔드포인트로 대체) |
| `fetchLeagueMeta` | `GET /api/v1/leagues/{leagueId}/meta` | `season`, `locale` | `LeagueMetaResponse` | Unused (인사이트는 `fetchHubOverview` 응답의 `leagueMeta` 사용) |
| `fetchHubOverview` | `GET /api/v1/leagues/{leagueId}/hub-overview` | `season`, `locale`, `limitFixtures`, `limitRankings` | `HubOverviewResponse` | `app/[locale]/(root)/home/page.tsx` → `EPLHubPage` |
| `fetchPremiumTable` | `GET /api/v1/leagues/{leagueId}/premium-table` | `season`, `locale`, `includeAnalytics` | `PremiumTableResponse` | `app/[locale]/(root)/teams/page.tsx` → `PremiumEPLTablePage` |

`fetchLeagueStandings`는 아직 직접 호출하지 않지만, 동일한 데이터가 `fetchHubOverview`·`fetchPremiumTable` 응답에 포함되어 있으므로 홈/테이블 화면은 이미 API 기반 렌더링을 수행합니다.

## Match APIs (`src/shared/api/epl/lib/matches.ts`)

| Function | Method & Path | Key Params | Response Type | Used By |
| --- | --- | --- | --- | --- |
| `fetchMatchSchedule` | `GET /api/v1/leagues/{leagueId}/schedule` | `season`, `locale`, `matchweek`, `includeFinished`, `includeAnalytics` | `MatchScheduleResponse` | `app/[locale]/(root)/matches/page.tsx`, `app/[locale]/(root)/matches/[matchId]/page.tsx`, `app/[locale]/(root)/home/page.tsx` (featured fixtures) |
| `fetchMatchDetail` | `GET /api/v1/matches/{matchId}` | `locale` | `MatchDetailResponse` | `app/[locale]/(root)/matches/[matchId]/page.tsx` metadata + detail |

## Player APIs (`src/shared/api/epl/lib/players.ts`)

| Function | Method & Path | Key Params | Response Type | Used By |
| --- | --- | --- | --- | --- |
| Function | Method & Path | Key Params | Response Type | Used By |
| --- | --- | --- | --- | --- |
| `fetchPlayerRankings` | `GET /api/v1/leagues/{leagueId}/player-rankings` | `season`, `locale`, `category`, `limit` | `PlayerRankingResponse` | Unused (홈 화면 랭킹은 `fetchHubOverview` 응답 사용) |
| `fetchPlayerDatabase` | `GET /api/v1/leagues/{leagueId}/players/database` | `season`, `locale`, `teamId`, `position`, `search`, `ageMin`, `ageMax` | `PlayerDatabaseResponse` | `app/[locale]/(root)/players/page.tsx` → `PlayerDatabasePage` |

## Team APIs (`src/shared/api/epl/lib/teams.ts`)

| Function | Method & Path | Key Params | Response Type | Used By |
| --- | --- | --- | --- | --- |
| Function | Method & Path | Key Params | Response Type | Used By |
| --- | --- | --- | --- | --- |
| `fetchTeamsInfo` | `GET /api/v1/teams` | `leagueId`, `search`, `locale` | `TeamsInfoResponse` | Unused (Team finder는 상세 페이지에서 profiles/squad 조합 사용) |
| `fetchTeamProfiles` | `GET /api/v1/leagues/{leagueId}/teams/profiles` | `season`, `locale`, `search` | `TeamProfilesResponse` | `app/[locale]/(root)/teams/detail/page.tsx` → `TeamInfoPage` |
| `fetchTeamSquad` | `GET /api/v1/teams/{teamId}/squad` | `season`, `locale` | `TeamSquadResponse` | `app/[locale]/(root)/teams/detail/page.tsx` (초기 렌더에서 전체 팀 루프) |

## News APIs (`src/shared/api/epl/lib/news.ts`)

| Function | Method & Path | Key Params | Response Type | Used By |
| --- | --- | --- | --- | --- |
| Function | Method & Path | Key Params | Response Type | Used By |
| --- | --- | --- | --- | --- |
| `fetchLeagueNewsList` | `GET /api/v1/leagues/{leagueId}/news` | `cursor`, `limit`, `categoryId`, `teamId`, `search`, `locale`, `includeFeatured`, `tagIds` | `NewsListResponse` | `app/[locale]/(root)/news/page.tsx` (hub listing) & `app/[locale]/(root)/news/[slug]/page.tsx` (static params) |
| `fetchLeagueNewsArticle` | `GET /api/v1/leagues/{leagueId}/news/{slug}` | `locale`, `includeRelated` | `NewsArticleResponse` | `app/[locale]/(root)/news/[slug]/page.tsx` metadata + detail |
| `fetchLeagueNewsHighlights` | `GET /api/v1/leagues/{leagueId}/news/highlights` | `limit`, `categoryId`, `locale` | `NewsHighlightsResponse` | Unused (hub 사이드 위젯은 list 응답을 slicing) |
| `fetchLeagueRelatedNews` | `GET /api/v1/leagues/{leagueId}/news/{slug}/related` | `limit`, `categoryId`, `excludeIds`, `locale` | `NewsRelatedResponse` | `app/[locale]/(root)/news/[slug]/page.tsx` 관련 기사 피드 |

## 연동 가이드

- **Mock ↔ Live 전환**: `.env`에서 `NEXT_PUBLIC_USE_MOCK_API=false`로 바꾸면 동일한 클라이언트가 즉시 실서버를 향해 호출됩니다. 기본값은 `true`라서 지금은 목 데이터가 API 응답 형태로 래핑되어 내려옵니다.
- **요청 공통값**: 레이아웃 루트에서 `DEFAULT_LEAGUE_ID`, `MOCK_SEASON`, `MOCK_LOCALE`을 가져다 쓰면 라우트마다 파라미터를 반복하지 않아도 됩니다.
- **에러 처리**: 모든 App Route는 `try/catch`로 감싸 두었으니, 실제 백엔드 연결 시에도 동일한 흐름으로 `notFound()` 혹은 오류 UI를 노출하면 됩니다.
- **병렬 호출**: `Promise.all` 패턴을 이미 홈/팀 상세 등 주요 페이지에서 사용 중이므로, 추가 API를 붙일 때도 동일한 구조로 확장하면 SSR 시간을 줄일 수 있습니다.

### 현재 `Unused`로 남아있는 헬퍼의 활용 계획

- `fetchLeagueStandings`: 허브/프리미엄 테이블에서 순위를 함께 내려받기 때문에 UI에서 직접 호출하지는 않지만, 순위 데이터만 필요로 하는 외부 서비스나 배치 작업, 모바일 전용 화면이 생기면 그대로 재사용할 수 있도록 유지합니다.
- `fetchLeagueMeta`: 리그 인사이트 위젯은 `fetchHubOverview`의 `leagueMeta`를 활용하지만, 향후 “리그 트렌드”처럼 가벼운 데이터만 필요한 페이지를 만들 때 별도 API 호출로 대체할 수 있습니다.
- `fetchNewsHighlights`: 현재는 뉴스 리스트를 슬라이스해서 하이라이트를 구성하지만, 백엔드가 별도의 큐레이션 피드를 제공하면 즉시 연결할 여지를 남겨둔 상태입니다.
- `fetchPlayerRankings`: 홈 화면은 오버뷰 응답의 상위 랭킹을 쓰지만, 득점/도움/폼 등 카테고리별 전용 화면을 추가할 때 필요합니다.
- `fetchTeamsInfo`: 팀 상세는 프로필·스쿼드 조합을 사용하는 대신, 전역 검색/오토컴플리트/관리 도구처럼 가벼운 목록만 필요할 때 이 엔드포인트가 더 적합합니다.
