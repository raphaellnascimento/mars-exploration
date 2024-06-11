export enum Direction {
  North = 'N',
  East = 'E',
  South = 'S',
  West = 'W'
}

export function toDirection(value: string): Direction | undefined {
  for (const key in Direction) {
    if (Direction[key as keyof typeof Direction] === value) {
      return Direction[key as keyof typeof Direction];
    }
  }
  return undefined;
}