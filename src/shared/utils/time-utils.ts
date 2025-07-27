/**
 * 현재 시간을 초 단위 Unix 타임스탬프로 변환
 * @returns number (예: 1748217600)
 */
export function getUnixTimestampInSeconds(): number {
  return Math.floor(new Date().getTime() / 1000);
}

export function toUnixTimestamp(date: Date): number {
  return Math.floor(date.getTime() / 1000);
}
