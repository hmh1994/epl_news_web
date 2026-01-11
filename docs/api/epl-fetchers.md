# EPL Fetch Functions Guide

> 서버와 통신하는 페치 함수들과 응답 구조, 주요 필드의 의미를 정리했습니다.  
> 모든 엔드포인트는 `/api/v1/league/${leagueId}` 프리픽스를 공유합니다.

---

## 1. 프리미엄 테이블 – `fetchPremiumTable`

- **Endpoint**: `GET /league/${leagueId}/teams`
- **Params**: `season`, `locale`
- **Response**: `PremiumTableResponse`

```jsonc
{
  "data": {
    "standings": [
      {
        "team": { "id": "mci", "name": "Manchester City", "shortName": "MCI", "crest": "🏆" },
        "position": 1,
        "record": {
          "played": 38,
          "won": 28,
          "drawn": 5,
          "lost": 5,
          "goalsFor": 99,
          "goalsAgainst": 31,
          "goalDifference": 68,
          "points": 89
        },
        "form": ["W", "W", "D", "W", "W"],
        "trend": 2,
        "advancedMetrics": {
          "xG": 84.3,
          "xGA": 31.2,
          "possession": 68.5,
          "passAccuracy": 91.2,
          "cleanSheets": 18,
          "bigChances": 127
        }
      }
    ]
  },
  "meta": { "leagueId": "epl", "season": "2024-25", "lastUpdated": 1700000000000, "locale": "ko-KR" }
}
```

**의미**
- `standings[*].team` : 프리미엄 테이블 UI의 로고/이름 표시용 요약 정보.
- `record` : 승점, 승/무/패, 득실차 등 기본 순위 테이블 열.
- `form`, `trend` : 최근 경기 흐름 및 상승/하락 지표.
- `advancedMetrics` : Season Analytics, 추가 카드에서 참조하는 고급 지표.

---

## 2. 시즌 분석 – `fetchSeasonAnalytics`

- **Endpoint**: `GET /league/${leagueId}/season/stat`
- **Params**: `season`, `locale`
- **Response**: `SeasonAnalyticsResponse`

```jsonc
{
  "data": {
    "metrics": [
      { "id": "total-goals", "title": "Total Goals", "value": "1,213", "delta": "+8.2%", "description": "시즌 총 득점" },
      { "id": "goals-per-match", "title": "Goals per Match", "value": "3.19", "delta": "+5.1%" }
    ]
  },
  "meta": { "leagueId": "epl", "season": "2024-25", "generatedAt": 1700000000000, "locale": "ko-KR" }
}
```

**의미**
- `metrics[*].value` : 절대 지표 (총 득점, 경기당 득점 등).
- `delta` : 이전 시즌/기간 대비 증감율.
- Season Analytics 카드(“시즌 분석” 섹션)의 각 타일과 매칭된다.

---

## 3. 팀 상세 – `fetchTeamDetail`

- **Endpoint**: `GET /league/${leagueId}/teams/${teamId}`
- **Params**: `season`, `locale`
- **Response**: `TeamDetailResponse`

```jsonc
{
  "data": {
    "team": {
      "summary": {
        "id": 1,
        "name": "Manchester City",
        "shortName": "MCI",
        "logo": "🏆",
        "manager": "Pep Guardiola",
        "description": "점유 기반 전술로 리그 최강 전력을 구축한 클럽."
      },
      "meta": {
        "rank": 1,
        "points": 89,
        "played": 38,
        "won": 28,
        "drawn": 5,
        "lost": 5,
        "goalsFor": 99,
        "goalsAgainst": 31,
        "avgAge": 28.2,
        "trophies": 10
      },
      "static": {
        "founded": 1880,
        "stadium": "Etihad Stadium",
        "capacity": 55000,
        "colors": { "primary": "#6CABDD", "secondary": "#1C2C5B" },
        "keyStats": { "possession": 68.5, "passAccuracy": 91.2, "shotsPerGame": 16.8, "cleanSheets": 18 }
      },
      "squad": [
        {
          "id": 1,
          "number": 9,
          "name": "Erling Haaland",
          "position": "ST",
          "age": 23,
          "nationality": "🇳🇴",
          "teamId": 1,
          "rating": 9.2,
          "goals": 36,
          "assists": 8,
          "appearances": 35,
          "marketValue": 180000000
        }
      ]
    }
  },
  "meta": { "leagueId": "epl", "teamId": "1", "season": "2024-25", "lastUpdated": 1700000000000, "locale": "ko-KR" }
}
```

**의미**
- `summary`: 팀 정보 헤더(로고/클럽 소개/감독)에 사용.
- `meta`: 랭킹·승점·성과 지표. 팀 상세 개요 카드에 표시.
- `static`: 창단연도, 홈구장, 팀 컬러, Key Stats 등 비교적 변하지 않는 데이터.
- `squad`: 팀 상세 → 스쿼드 탭 리스트.

---

## 4. 선수 상세 – `fetchPlayerDetail`

- **Endpoint**: `GET /league/${leagueId}/player/${playerId}`
- **Params**: `season`, `locale`
- **Response**: `PlayerDetailResponse`

```jsonc
{
  "data": {
    "player": {
      "summary": {
        "id": 1,
        "name": "Erling Haaland",
        "teamId": "mci",
        "position": "ST",
        "photo": "🇳🇴",
        "nationality": "Norway",
        "age": 23,
        "height": 195,
        "weight": 88
      },
      "attributes": {
        "pace": 89,
        "shooting": 94,
        "passing": 65,
        "dribbling": 80,
        "defending": 45,
        "physical": 88
      },
      "performance": {
        "goals": 36,
        "assists": 8,
        "pace": 89
      },
      "career": [
        { "year": "2022-", "teamId": "mci", "matches": 53, "goals": 52 },
        { "year": "2020-22", "teamId": "bvb", "matches": 89, "goals": 86 }
      ]
    }
  },
  "meta": { "leagueId": "epl", "playerId": 1, "season": "2024-25", "lastUpdated": 1700000000000, "locale": "ko-KR" }
}
```

**의미**
- `summary`: 팝업 상단(팀/포지션/국적/신체 정보).
- `attributes`: Pace·Shooting 등 Player Attributes 카드.
- `performance`: Goals, Assists 등 Performance 카드.
- `career`: 하단 Career History 카드.

---

## 5. 득점왕 경쟁 – `fetchScoringRace`

- **Endpoint**: `GET /league/${leagueId}/players/scoring-race`
- **Params**: `season`, `locale`, `limit`
- **Response**: `PlayerRankingResponse`

```jsonc
{
  "data": [
    { "name": "Erling Haaland", "teamId": "mci", "goals": 36, "assists": 8, "avatar": "🇳🇴", "rating": 92, "value": "—" },
    { "name": "Mohamed Salah", "teamId": "liv", "goals": 18, "assists": 10, "avatar": "🇪🇬", "rating": 88, "value": "—" }
  ],
  "meta": {
    "leagueId": "epl",
    "season": "2024-25",
    "locale": "ko-KR",
    "category": "top-scorers",
    "source": "mock-data"
  }
}
```

**의미**
- `data` 배열은 홈 화면 “득점왕 경쟁” 카드에 그대로 쓰이는 상위 득점자 정보.
- `goals`, `assists`는 즉시 위젯에 표시 가능하며, `rating`은 카드의 부가 지표로 사용.

---

## 6. 경기 일정 – `fetchMatchSchedule`

- **Endpoint**: `GET /league/${leagueId}/matches`
- **Params**: `season`, `locale`, `matchweek`
- **Response**: `MatchScheduleResponse`

```jsonc
{
  "data": {
    "matchweeks": [18, 19, 20],
    "schedule": [
      {
        "date": "2024-12-21",
        "fixtures": [
          {
            "id": "m-241221-ars-liv",
            "matchweek": 19,
            "kickoff": "2024-12-21T17:30:00Z",
            "venue": "Emirates Stadium",
            "city": "London",
            "status": "upcoming",
            "headline": "Title race clash in North London",
            "referee": "Chris Kavanagh",
            "home": {
              "teamId": "ars",
              "leaguePosition": 2,
              "recentForm": ["W", "W", "D", "W", "W"]
            },
            "away": {
              "teamId": "liv",
              "leaguePosition": 3,
              "recentForm": ["W", "D", "W", "W", "L"]
            }
          }
        ]
      }
    ]
  },
  "meta": { "leagueId": "epl", "season": "2024-25", "lastUpdated": 1700000000000, "locale": "ko-KR" }
}
```

**의미**
- `matchweek` 파라미터를 전달하면 해당 주차 데이터만 반환된다.
- `matchweeks` : 필터/탭 UI에 사용하는 주차 목록.
- `schedule[*].fixtures` : 날짜별 경기 카드 데이터.

---

## 7. 전체 일정 – `fetchFullMatchSchedule`

- **Endpoint**: `GET /league/${leagueId}/matches/all`
- **Params**: `season`, `locale`
- **Response**: `MatchScheduleResponse`

```jsonc
{
  "data": {
    "matchweeks": [16, 17, 18, 19, 20],
    "schedule": [
      {
        "date": "2024-12-14",
        "fixtures": [
          {
            "id": "m-241214-mci-ars",
            "matchweek": 18,
            "kickoff": "2024-12-14T12:30:00Z",
            "venue": "Etihad Stadium",
            "city": "Manchester",
            "status": "upcoming",
            "headline": "Top-of-the-table showdown",
            "referee": "Michael Oliver",
            "home": {
              "teamId": "mci",
              "leaguePosition": 1,
              "recentForm": ["W", "W", "D", "W", "W"]
            },
            "away": {
              "teamId": "ars",
              "leaguePosition": 2,
              "recentForm": ["W", "W", "W", "D", "W"]
            }
          }
        ]
      }
    ]
  },
  "meta": { "leagueId": "epl", "season": "2024-25", "lastUpdated": 1700000000000, "locale": "ko-KR" }
}
```

**의미**
- 전체 일정을 한번에 내려준다.

---

## 8. 매치위크 목록 – `fetchMatchweekOptions`

- **Endpoint**: `GET /league/${leagueId}/matches/matchweeks`
- **Params**: `season`, `locale`
- **Response**: `MatchweekOptionsResponse`

```jsonc
{
  "data": {
    "matchweeks": [
      { "matchweek": 18, "startDate": "2024-12-14", "endDate": "2024-12-16" },
      { "matchweek": 19, "startDate": "2024-12-21", "endDate": "2024-12-22" }
    ]
  },
  "meta": { "leagueId": "epl", "season": "2024-25", "lastUpdated": 1700000000000, "locale": "ko-KR" }
}
```

**의미**
- 매치위크 필터 칩 UI에 사용하는 목록만 제공한다.

---

## 9. 뉴스 목록 – `fetchNewsList`

- **Endpoint**: `GET /api/v1/news`
- **Params**: `cursor`, `limit`, `categoryId`, `tagIds`, `teamId`, `search`, `locale`, `includeFeatured`
- **Response**: `NewsListResponse`

```jsonc
{
  "data": [
    {
      "id": "mcfc-title-race-analytics",
      "slug": "city-title-race-analytics",
      "title": "맨시티, 4연패 도전 속 승점 추격 로드맵 공개",
      "summary": "펩 과르디올라 감독이 이끄는 맨체스터 시티가 막판 스퍼트를 위해 체력 배분과 맞춤형 전술을 도입했다.",
      "category": { "id": "premier-league", "slug": "premier-league", "label": "프리미어리그" },
      "tags": [
        { "id": "맨시티", "slug": "맨시티", "label": "맨시티" },
        { "id": "우승경쟁", "slug": "우승경쟁", "label": "우승경쟁" }
      ],
      "heroImage": { "url": "https://images.unsplash.com/photo.jpg" },
      "thumbnail": { "url": "https://images.unsplash.com/photo.jpg" },
      "publishedAt": "2024-03-10T09:00:00Z",
      "readingTimeMinutes": 5,
      "author": { "name": "정현석 기자" },
      "source": { "name": "infootball 데이터랩", "type": "external" },
      "externalUrl": "https://infootball.kr/news/city-title-race-analytics",
      "isFeatured": false
    }
  ],
  "meta": {
    "pagination": {
      "total": 120,
      "pageSize": 24,
      "hasNext": true,
      "hasPrevious": false,
      "nextCursor": "eyJpZCI6ICJtY2ZjLXRpdGxlLXJhY2UtYW5hbHl0aWNzIn0="
    },
    "locale": "ko-KR",
    "lastUpdated": 1700000000000,
    "filters": { "categoryId": "premier-league", "search": "title race" }
  }
}
```

**의미**
- `data[*]` : 뉴스 카드/리스트에 바로 바인딩 가능한 프리뷰 형태.
- `category`, `tags` : 필터/배지 노출용. slug/label 포함.
- `pagination` : 무한스크롤/페이지네이션 구현 시 사용.
- `isFeatured` : 홈 상단 하이라이트, 섹션 구분 등에 활용.

---

## 참고

- 모든 fetch 함수는 실패 시 mock 데이터로 폴백하도록 구현돼 있으므로, 개발/로컬 환경에서 BFF 가용성 없이도 동일한 구조로 데이터를 확인할 수 있습니다.
