# EPL 페이지별 API 매트릭스

> **목표**  
> 각 Next.js Route가 실제로 호출하는 API와 화면에서 소비하는 필드만을 명시해, 중복된 정보를 줄이고 필요한 데이터를 빠르게 확인할 수 있도록 정리했습니다.

---

## 홈 `/home` → `EPLHubPage`

| Fetcher | Endpoint | UI에서 소비하는 필드 | 비고 |
| --- | --- | --- | --- |
| `fetchHubOverview` | `GET /api/v1/leagues/{leagueId}/hub-overview` | `data.standings` → `tableRows`, `data.playerRankings`, `data.leagueMeta` | API 응답도 이 세 블록만 남도록 정리됨 |
| `fetchMatchSchedule` | `GET /api/v1/leagues/{leagueId}/schedule` | `data.schedule` → 홈 탭 매치 리스트, `data.matchweeks` → 필터 옵션 | Spotlight/Analytics 데이터 제거 |

---

## 리그 `/league` → `LeagueOverviewPage`

| Fetcher | Endpoint | UI에서 소비하는 필드 | 비고 |
| --- | --- | --- | --- |
| `fetchLeagueMetadata` | `GET /api/v1/leagues/{leagueId}/metadata` | `data.summary` → `LeagueEntry`, `data.overviewStats`, `data.champions`, `data.successfulClubs` | 하이라이트/기타 필드는 응답에서 제거 |

---

## 프리미엄 테이블 `/teams` → `PremiumEPLTablePage`

| Fetcher | Endpoint | UI에서 소비하는 필드 | 비고 |
| --- | --- | --- | --- |
| `fetchPremiumTable` | `GET /api/v1/leagues/{leagueId}/premium-table` | `data.standings` → `toLeagueTableTeam` 결과만 사용 | Analytics/Value band 필드 제거 |

---

## 팀 정보 `/teams/detail` → `TeamInfoPage`

| Fetcher | Endpoint | UI에서 소비하는 필드 | 비고 |
| --- | --- | --- | --- |
| `fetchTeamProfiles` | `GET /api/v1/leagues/{leagueId}/teams/profiles` | `data.teams` → `TeamSelectionGrid`, `TeamDetailSection` | 외부 응답의 `filters.positions` 같은 메타 필드는 사용하지 않아 정상화 단계에서 제거됨 |
| `fetchTeamSquad` (팀별 반복 호출) | `GET /api/v1/leagues/{leagueId}/teams/{teamId}/squad` | `data.team`(기본 정보), `data.squad` → 선수 풀 | 모든 팀에 대해 병렬로 호출 후 단일 선수 리스트로 합침 |

---

## 경기 일정 `/matches` → `MatchSchedulePage`

| Fetcher | Endpoint | UI에서 소비하는 필드 | 비고 |
| --- | --- | --- | --- |
| `fetchMatchSchedule` | `GET /api/v1/leagues/{leagueId}/schedule` | `data.schedule`, `data.matchweeks` | 동일 API를 홈 탭에서도 재사용 |

---

## 경기 상세 `/matches/[matchId]` → `MatchDetailPage`

| Fetcher | Endpoint | UI에서 소비하는 필드 | 비고 |
| --- | --- | --- | --- |
| `fetchMatchSchedule` | `GET /api/v1/leagues/{leagueId}/schedule` | `generateStaticParams` 용 `fixture.id` | 정적 경로 생성을 위해서만 사용 |
| `fetchMatchDetail` | `GET /api/v1/matches/{matchId}` | `data` 전체 → 상세 페이지 및 `generateMetadata` | 실패 시 `notFound()` 처리 |

---

## 선수 데이터베이스 `/players` → `PlayerDatabasePage`

| Fetcher | Endpoint | UI에서 소비하는 필드 | 비고 |
| --- | --- | --- | --- |
| `fetchPlayerDatabase` | `GET /api/v1/leagues/{leagueId}/players/database` | `data.players`, `data.filters.positions`, `data.filters.teamIds` | 연령/국적 등의 추가 필터는 현재 UI에 노출되지 않음 |

---

## 뉴스 허브 `/news` → `NewsHubPage`

| Fetcher | Endpoint | UI에서 소비하는 필드 | 비고 |
| --- | --- | --- | --- |
| `fetchLeagueNewsList` | `GET /api/v1/leagues/{leagueId}/news` | 기사 리스트 → `mapNewsPreviewFromApi` | `includeFeatured`, `limit`, `locale` 파라미터만 사용 |

---

## 뉴스 상세 `/news/[slug]` → `NewsDetailPage`

| Fetcher | Endpoint | UI에서 소비하는 필드 | 비고 |
| --- | --- | --- | --- |
| `fetchLeagueNewsList` | `GET /api/v1/leagues/{leagueId}/news` | `generateStaticParams`의 `slug` | |
| `fetchLeagueNewsArticle` | `GET /api/v1/leagues/{leagueId}/news/{slug}` | 본문 데이터 → 기사 뷰 & `generateMetadata` | `mapNewsArticleFromApi` 로 변환 |
| `fetchLeagueRelatedNews` | `GET /api/v1/leagues/{leagueId}/news/{slug}/related` | 관련 기사 카드 | 현재 기사와 `id`가 같은 항목은 필터링 |

---

## 요약

- 각 섹션은 실제 Route 파일(`app/[locale]/(root)/.../page.tsx`)의 fetcher 호출과 UI Prop을 기준으로 작성했습니다.
- API가 더 많은 필드를 반환하더라도 위 표에 없는 값은 현재 화면에서 사용하지 않으므로, 응답 구조를 바꾸거나 Mock을 축소할 때 참조할 수 있습니다.
