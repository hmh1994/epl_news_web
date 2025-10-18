import { MatchDetail } from "@/entities/match/model/match-detail";
import { MatchFixture } from "@/entities/match/model/match-schedule";
import { EPL_MATCH_SCHEDULE } from "@/shared/mocks/match-schedule";

const fixturesById = new Map<string, MatchFixture>();
for (const day of EPL_MATCH_SCHEDULE) {
  for (const fixture of day.fixtures) {
    fixturesById.set(fixture.id, fixture);
  }
}

function getFixture(matchId: string): MatchFixture {
  const fixture = fixturesById.get(matchId);
  if (!fixture) {
    throw new Error(`Unknown match detail fixture id: ${matchId}`);
  }

  return fixture;
}

export const MATCH_DETAILS: Record<string, MatchDetail> = {
  "m-241214-mci-ars": {
    fixture: getFixture("m-241214-mci-ars"),
    heroTagline: "Matchweek 18 • Title rivals collide at the Etihad",
    attendance: 55097,
    insights: [
      {
        label: "득점 기대값",
        value: "MCI 2.1 vs ARS 1.4",
        trend: "up",
        helperText: "최근 5경기 평균 xG",
      },
      {
        label: "포지션 점유율",
        value: "62%",
        trend: "steady",
        helperText: "맨시티의 최근 홈경기 평균",
      },
      {
        label: "무패 기록",
        value: "홈 29경기",
        trend: "up",
        helperText: "프리미어리그 홈 경기 연속 무패",
      },
    ],
    timeline: [
      {
        minute: "프리뷰",
        type: "info",
        team: "neutral",
        title: "최근 5경기 승률",
        description:
          "맨시티 80%(4승 1무), 아스널 80%(4승 1무). 양 팀 모두 최근 패배 없음.",
      },
      {
        minute: "T-24h",
        type: "info",
        team: "home",
        title: "홈 평균 득점",
        description:
          "맨시티는 이번 시즌 리그 홈경기에서 경기당 2.7골을 기록 중입니다.",
      },
      {
        minute: "T-3h",
        type: "info",
        team: "away",
        title: "원정 실점",
        description:
          "아스널은 최근 원정 5경기에서 경기당 평균 실점 0.8골로 리그 최소 실점 2위입니다.",
      },
    ],
    stats: [
      {
        label: "경기당 득점",
        home: 2.5,
        away: 2.1,
        higherIsBetter: true,
      },
      {
        label: "경기당 실점",
        home: 0.8,
        away: 0.7,
        higherIsBetter: false,
      },
      {
        label: "슈팅 (평균)",
        home: 15,
        away: 13,
        higherIsBetter: true,
      },
      {
        label: "클린시트",
        home: 7,
        away: 9,
        higherIsBetter: true,
      },
    ],
    keyPlayers: {
      home: {
        name: "필 포든",
        role: "LW",
        stat: "최근 4경기 3골 2도움",
        highlight: "90분당 슈팅 3.2회, 기대득점(xG) 0.45를 기록하고 있습니다.",
        form: ["W", "W", "D", "W", "W"],
      },
      away: {
        name: "부카요 사카",
        role: "RW",
        stat: "이번 시즌 리그 11골",
        highlight: "최근 5경기 동안 90분당 드리블 성공 2.1회, 키패스 2.4회를 기록 중입니다.",
        form: ["W", "W", "W", "D", "W"],
      },
    },
    formGuide: {
      home: [
        {
          opponent: "CHE",
          result: "W",
          score: "3-1",
          competition: "PL",
          date: "12월 8일",
        },
        {
          opponent: "NEW",
          result: "W",
          score: "2-0",
          competition: "UCL",
          date: "12월 4일",
        },
        {
          opponent: "TOT",
          result: "D",
          score: "1-1",
          competition: "PL",
          date: "12월 1일",
        },
      ],
      away: [
        {
          opponent: "AVL",
          result: "W",
          score: "2-1",
          competition: "PL",
          date: "12월 9일",
        },
        {
          opponent: "PSV",
          result: "W",
          score: "3-0",
          competition: "UCL",
          date: "12월 4일",
        },
        {
          opponent: "BHA",
          result: "D",
          score: "2-2",
          competition: "PL",
          date: "11월 30일",
        },
      ],
    },
    headToHead: [
      {
        date: "2024-09-25",
        competition: "PL",
        score: "ARS 0-1 MCI",
        note: "로드리의 후반 추가시간 결승골",
      },
      {
        date: "2024-04-21",
        competition: "PL",
        score: "MCI 1-1 ARS",
        note: "타이트한 중원 싸움, 점유율 54:46",
      },
      {
        date: "2023-10-08",
        competition: "PL",
        score: "ARS 1-0 MCI",
        note: "마르티넬리의 극장골",
      },
    ],
    previewNotes: [
      "맨시티는 최근 홈 10경기에서 평균 점유율 63%와 평균 슈팅 16.2회를 기록했습니다.",
      "아스널은 원정 5경기에서 세트피스 득점 3골과 클린시트 3회를 달성했습니다.",
      "두 팀의 시즌 평균 PPDA는 맨시티 8.9, 아스널 9.4로 상위권 압박 지표를 유지 중입니다.",
    ],
    broadcastNotes: [
      "국내 중계: 스포티비 온, 스포티비 나우",
      "해설: 박문성 x 한준희 조합",
    ],
  },
  "m-241214-che-tot": {
    fixture: getFixture("m-241214-che-tot"),
    heroTagline: "런던 더비 • 파란색과 하얀색의 명승부",
    attendance: 40341,
    insights: [
      {
        label: "Expected Threat",
        value: "CHE 1.8 vs TOT 1.5",
        trend: "up",
        helperText: "양 팀의 누적 공격 위협 지수",
      },
      {
        label: "세컨볼 회수",
        value: "Chelsea +7",
        trend: "up",
        helperText: "후반전 Tottenham 대비",
      },
      {
        label: "슈팅 정확도",
        value: "57%",
        trend: "steady",
        helperText: "유효 슈팅 8/14",
      },
    ],
    timeline: [
      {
        minute: "12'",
        type: "goal",
        team: "home",
        title: "스털링, 시즌 5번째 리그 득점",
        description: "Expected Goals 0.14 상황을 정확히 마무리",
        player: "Raheem Sterling",
        assist: "Cole Palmer",
      },
      {
        minute: "29'",
        type: "card",
        team: "away",
        title: "벤 데이비스 경고",
        description: "데이비스의 시즌 4번째 경고",
        player: "Ben Davies",
      },
      {
        minute: "45+2'",
        type: "goal",
        team: "away",
        title: "손흥민, 전반 추가시간 동점골",
        description: "슈팅 속도 102km/h, xG 0.28",
        player: "Son Heung-min",
        assist: "Dejan Kulusevski",
      },
      {
        minute: "61'",
        type: "goal",
        team: "home",
        title: "팔머, 시즌 8번째 득점",
        description: "코너킥 세컨볼 xG 0.19",
        player: "Cole Palmer",
      },
      {
        minute: "78'",
        type: "substitution",
        team: "away",
        title: "토트넘 교체 카드",
        description: "히살리송 ↔ 존슨, 투톱 전환",
      },
      {
        minute: "90+5'",
        type: "whistle",
        team: "neutral",
        title: "풀타임",
        description: "첼시 2-1 토트넘",
      },
    ],
    stats: [
      {
        label: "점유율",
        home: 58,
        away: 42,
        higherIsBetter: true,
      },
      {
        label: "슈팅 / 유효",
        home: 14,
        away: 10,
        higherIsBetter: true,
      },
      {
        label: "패스 성공률",
        home: 87,
        away: 83,
        higherIsBetter: true,
      },
      {
        label: "PPDA",
        home: 8,
        away: 11,
        higherIsBetter: false,
      },
    ],
    keyPlayers: {
      home: {
        name: "콜 팔머",
        role: "AM",
        stat: "1골 1도움, 키패스 4회",
        highlight: "90분당 슈팅 3.4회, 페널티지역 진입 패스 6회를 기록했습니다.",
        form: ["L", "W", "D", "D", "W"],
      },
      away: {
        name: "손흥민",
        role: "CF",
        stat: "1골, xG 0.9",
        highlight: "이번 경기 5개의 슈팅과 스프린트 25회를 기록했습니다.",
        form: ["W", "L", "W", "W", "D"],
      },
    },
    formGuide: {
      home: [
        {
          opponent: "BRE",
          result: "W",
          score: "1-0",
          competition: "PL",
          date: "12월 6일",
        },
        {
          opponent: "MUN",
          result: "D",
          score: "1-1",
          competition: "PL",
          date: "12월 1일",
        },
        {
          opponent: "NEW",
          result: "L",
          score: "1-4",
          competition: "PL",
          date: "11월 25일",
        },
      ],
      away: [
        {
          opponent: "AVL",
          result: "W",
          score: "3-2",
          competition: "PL",
          date: "12월 7일",
        },
        {
          opponent: "WHU",
          result: "L",
          score: "1-2",
          competition: "PL",
          date: "12월 2일",
        },
        {
          opponent: "BOU",
          result: "W",
          score: "3-1",
          competition: "PL",
          date: "11월 24일",
        },
      ],
    },
    headToHead: [
      {
        date: "2024-02-23",
        competition: "PL",
        score: "TOT 1-2 CHE",
        note: "첼시 슈팅 14-9, xG 1.9-1.1",
      },
      {
        date: "2023-11-06",
        competition: "PL",
        score: "TOT 1-4 CHE",
        note: "첼시 점유율 60%, 토트넘 퇴장 2",
      },
      {
        date: "2023-02-26",
        competition: "PL",
        score: "TOT 2-0 CHE",
        note: "Expected Goals 1.5-0.7",
      },
    ],
    previewNotes: [
      "첼시는 xG 1.92, 토트넘은 xG 1.07을 기록하며 마무리 효율에서 앞섰습니다.",
      "세컨볼 회수 수치는 첼시 19회, 토트넘 12회로 중원 압박에서 격차가 나타났습니다.",
      "첼시는 상대 박스 내 터치 28회를 완성하며 하프스페이스 진입 횟수 15회를 기록했습니다.",
    ],
    broadcastNotes: [
      "경기 종료 후 30분, 첼시 공식 채널에서 하이라이트 공개",
      "현장 해설: 스카이 스포츠 프리미어",
    ],
  },
  "m-241215-liv-mun": {
    fixture: getFixture("m-241215-liv-mun"),
    heroTagline: "전통의 라이벌 • 안필드가 기다린 명승부",
    insights: [
      {
        label: "홈 연승",
        value: "11경기",
        trend: "up",
        helperText: "리버풀의 안필드 리그 연승",
      },
      {
        label: "클롭 vs 텐 하흐",
        value: "4승 1패",
        trend: "up",
        helperText: "감독 맞대결 전적",
      },
      {
        label: "카운터 위협",
        value: "MUN 1.9 xG",
        trend: "steady",
        helperText: "올시즌 원정 카운터 상황 평균",
      },
    ],
    timeline: [
      {
        minute: "프리뷰",
        type: "info",
        team: "neutral",
        title: "시즌 득점",
        description: "리버풀 36골, 맨유 24골. 평균 득점 2.4 vs 1.6입니다.",
      },
      {
        minute: "T-12h",
        type: "info",
        team: "home",
        title: "안필드 연승 지표",
        description: "리버풀은 홈 11연승 동안 실점 8, 경기당 유효슈팅 6.1회를 기록했습니다.",
      },
      {
        minute: "T-2h",
        type: "info",
        team: "away",
        title: "전환 상황 xG",
        description: "맨유는 올 시즌 원정 빠른 역습 상황에서 누적 xG 1.9, 득점 7골을 기록했습니다.",
      },
    ],
    stats: [
      {
        label: "득점 (시즌)",
        home: 36,
        away: 24,
        higherIsBetter: true,
      },
      {
        label: "슈팅 (평균)",
        home: 18,
        away: 12,
        higherIsBetter: true,
      },
      {
        label: "빅찬스 창출",
        home: 15,
        away: 9,
        higherIsBetter: true,
      },
      {
        label: "클린시트",
        home: 6,
        away: 4,
        higherIsBetter: true,
      },
    ],
    keyPlayers: {
      home: {
        name: "모하메드 살라",
        role: "RW",
        stat: "최근 라이벌전 5경기 9공격포인트",
        highlight: "이번 시즌 90분당 기대득점 0.54, 90분당 유효슈팅 2.3회를 기록 중입니다.",
        form: ["W", "D", "W", "W", "L"],
      },
      away: {
        name: "마커스 래시포드",
        role: "LW",
        stat: "리그 6골, 직전 경기 멀티골",
        highlight: "최근 5경기에서 90분당 슈팅 3.1회, 박스 안 터치 5.4회를 기록하고 있습니다.",
        form: ["L", "W", "W", "L", "D"],
      },
    },
    formGuide: {
      home: [
        {
          opponent: "FUL",
          result: "W",
          score: "3-1",
          competition: "PL",
          date: "12월 8일",
        },
        {
          opponent: "NAP",
          result: "D",
          score: "1-1",
          competition: "UCL",
          date: "12월 4일",
        },
        {
          opponent: "BHA",
          result: "W",
          score: "2-0",
          competition: "PL",
          date: "12월 1일",
        },
      ],
      away: [
        {
          opponent: "NEW",
          result: "L",
          score: "1-3",
          competition: "PL",
          date: "12월 7일",
        },
        {
          opponent: "GAL",
          result: "W",
          score: "2-1",
          competition: "UCL",
          date: "12월 3일",
        },
        {
          opponent: "BRE",
          result: "W",
          score: "2-0",
          competition: "PL",
          date: "11월 30일",
        },
      ],
    },
    headToHead: [
      {
        date: "2024-03-17",
        competition: "FA Cup",
        score: "MUN 4-3 LIV",
        note: "연장 끝에 텐 하흐의 역전 드라마",
      },
      {
        date: "2024-01-22",
        competition: "PL",
        score: "LIV 7-0 MUN",
        note: "안필드 악몽, 살라 멀티골",
      },
      {
        date: "2023-12-16",
        competition: "PL",
        score: "MUN 0-0 LIV",
        note: "텐 하흐의 수비 전술 성공",
      },
    ],
    previewNotes: [
      "리버풀은 리그에서 단일 경기 평균 패널티박스 침투 32.5회로 1위를 기록 중입니다.",
      "맨유는 원정 경기당 인터셉트 13.4회, 성공 태클 17.2회로 수비 개입이 많습니다.",
      "두 팀의 세트피스 득점 비중은 리버풀 22%, 맨유 18%로 세트 상황이 승부처로 예상됩니다.",
    ],
    broadcastNotes: [
      "국내 중계: 쿠팡플레이 단독",
      "현장 중계석은 더 코프 맞은편 프레스존",
    ],
  },
  "m-241215-new-bha": {
    fixture: getFixture("m-241215-new-bha"),
    heroTagline: "Matchweek 18 • 세인트 제임스 파크에서 승점 1씩 나눠가진 밤",
    insights: [
      {
        label: "득점 기대값",
        value: "NEW 1.45 vs BHA 1.32",
        trend: "steady",
        helperText: "경기 공식 xG",
      },
      {
        label: "박스 터치",
        value: "NEW 27 vs BHA 25",
        trend: "steady",
        helperText: "페널티 지역 터치 수",
      },
      {
        label: "세이브",
        value: "포프 4 vs 스틸 5",
        trend: "up",
        helperText: "양 팀 골키퍼 선방",
      },
    ],
    timeline: [
      {
        minute: "18'",
        type: "info",
        team: "neutral",
        title: "초반 점유율",
        description: "뉴캐슬 55%, 브라이튼 45%로 홈이 주도권을 잡았습니다.",
      },
      {
        minute: "34'",
        type: "goal",
        team: "home",
        title: "이사크 선제골",
        description: "슈팅 xG 0.23, 시즌 리그 9호",
        player: "Alexander Isak",
        assist: "Anthony Gordon",
      },
      {
        minute: "58'",
        type: "goal",
        team: "away",
        title: "웰벡 동점골",
        description: "터치 2회, 슈팅 정확도 100%",
        player: "Danny Welbeck",
        assist: "Pascal Groß",
      },
      {
        minute: "79'",
        type: "var",
        team: "neutral",
        title: "브라이튼 역전골 취소",
        description: "미토마의 골이 오프사이드로 무효 처리",
      },
      {
        minute: "90+3'",
        type: "whistle",
        team: "neutral",
        title: "풀타임",
        description: "뉴캐슬 1-1 브라이튼",
      },
    ],
    stats: [
      {
        label: "점유율",
        home: 52,
        away: 48,
        higherIsBetter: true,
      },
      {
        label: "슈팅 / 유효",
        home: 13,
        away: 12,
        higherIsBetter: true,
      },
      {
        label: "세트피스",
        home: 7,
        away: 6,
        higherIsBetter: true,
      },
      {
        label: "세이브",
        home: 4,
        away: 5,
        higherIsBetter: true,
      },
    ],
    keyPlayers: {
      home: {
        name: "Bruno Guimarães",
        role: "CM",
        stat: "패스 성공률 89%",
        highlight: "전진 패스 7회와 볼 리커버리 8회를 기록했습니다.",
        form: ["D", "W", "L", "D", "W"],
      },
      away: {
        name: "Pascal Groß",
        role: "AM",
        stat: "키패스 4회",
        highlight: "세트피스 포함 총 5차례 결정적인 찬스를 만들었습니다.",
        form: ["L", "D", "L", "W", "D"],
      },
    },
    formGuide: {
      home: [
        {
          opponent: "ARS",
          result: "D",
          score: "2-2",
          competition: "PL",
          date: "12월 8일",
        },
        {
          opponent: "MCI",
          result: "L",
          score: "0-2",
          competition: "PL",
          date: "12월 3일",
        },
        {
          opponent: "FUL",
          result: "W",
          score: "3-0",
          competition: "PL",
          date: "11월 30일",
        },
      ],
      away: [
        {
          opponent: "WHU",
          result: "D",
          score: "1-1",
          competition: "PL",
          date: "12월 8일",
        },
        {
          opponent: "BRE",
          result: "W",
          score: "2-0",
          competition: "PL",
          date: "12월 4일",
        },
        {
          opponent: "TOT",
          result: "L",
          score: "1-3",
          competition: "PL",
          date: "12월 1일",
        },
      ],
    },
    headToHead: [
      {
        date: "2024-04-13",
        competition: "PL",
        score: "BHA 1-1 NEW",
        note: "온타겟 슈팅 6-5",
      },
      {
        date: "2023-08-12",
        competition: "PL",
        score: "NEW 4-1 BHA",
        note: "뉴캐슬 xG 3.2, 브라이튼 0.9",
      },
      {
        date: "2023-05-18",
        competition: "PL",
        score: "NEW 1-1 BHA",
        note: "코너킥 7-6",
      },
    ],
    previewNotes: [
      "뉴캐슬은 홈 경기당 평균 슈팅 17.1회로 리그 2위입니다.",
      "브라이튼은 점유율 58%로 리그 상위권을 유지하며 빌드업을 전개합니다.",
      "세트피스 득점 비중이 양 팀 모두 20%를 넘기며, 코너킥 상황이 중요했습니다.",
    ],
    broadcastNotes: [
      "국내 중계: 스포티비 온",
      "국제 중계: Premier League Productions",
    ],
  },
};

export function getMatchDetail(matchId: string): MatchDetail | undefined {
  return MATCH_DETAILS[matchId];
}

export function getMatchDetailIds(): string[] {
  return Object.keys(MATCH_DETAILS);
}
