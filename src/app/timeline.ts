import { Point, Container } from './types';

export interface TrackingTrace {
  title: string;
  isCurrent: boolean;
  message: string;
}

export interface Line {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  stroke:string;
  stroke_width: number;
  stroke_dasharray?: string;
}

export class TimeLine {
  lineStroke = { solid: '#173A64', dashed: '#CFCFCF' };
  line_y = 27;
  circle_r = 7;
  points: Point[] = [];

  lines: Line[] = [];

  constructor(private container: Container, private trackingTraces: TrackingTrace[]) {
    console.log(this.trackingTraces);
    this.buildPoints();
    this.buildLines();
    this.buildCircles();
  }

  buildPoints() {
    const length = this.container.w - this.circle_r - this.circle_r;
    const step = length / (this.trackingTraces.length - 1);
    for (var i = 0; i < this.trackingTraces.length; i++) {
      const x = this.circle_r + (step * i)
      this.points.push({x: x, y: this.line_y});
    }
    console.log('points', this.points);
  }

  buildLines() {
    // this.lines = [
    //   { x1: 12, y1: 27, x2: 121, y2: 27, stroke: '#173A64', stroke_width: 2, stroke_dasharray: '5 3'}
    // ];
    let isSolid = !this.trackingTraces[0].isCurrent;
    for (var i = 1; i < this.trackingTraces.length; i++) {
      const line: Line = {
        x1: this.points[i - 1].x, 
        y1: this.line_y,
        x2: this.points[i].x,
        y2: this.line_y,
        stroke: isSolid? this.lineStroke.solid : this.lineStroke.dashed,
        stroke_width: 2,
        stroke_dasharray: isSolid? null : '5 3'
      };
      if (isSolid) { isSolid = !this.trackingTraces[i].isCurrent; }
      this.lines.push(line);
    }
    console.log('lines', this.lines);
  }

  buildCircles() {

  }

}