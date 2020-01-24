export type Point = { x: number; y: number };
export type Container = { w: number; h: number };
export enum TrackingTraceState {
  PAST = 'PAST',
  CURRENT = 'CURRENT',
  FUTURE = 'FUTURE'
}
