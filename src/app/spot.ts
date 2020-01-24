import { Point, TrackingTraceState } from './types';
export class Spot {
  // point: Point;
  radius: number;
  fill: string;
  stroke?: string;
  stroke_width?: number;
  state?:TrackingTraceState;
  tick: { p1: Point, p2: Point, p3: Point, p4: Point};

  constructor(private point: Point) {
  }

}