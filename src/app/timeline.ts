import { Point, Container, TrackingTraceState } from './types';
import { Spot } from './spot';

export interface TrackingTrace {
  title: string;
  isCurrent: boolean;
  message: string;
  state?:TrackingTraceState;
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
  step: number;

  lines: Line[] = [];
  trackingTraces: TrackingTrace[] = [];
  spots: Spot[] = [];

  constructor(private container: Container, private trackingTracesOriginal: TrackingTrace[]) {
    this.polishData();
    this.buildPoints();
    this.buildLines();
    this.buildStops();
  }

  polishData() {
    let foundCurrent = false;
    this.trackingTracesOriginal.map(item => {
      let state: TrackingTraceState; 
      if (foundCurrent) { state = TrackingTraceState.FUTURE; }
      else if (item.isCurrent) {
        state = TrackingTraceState.CURRENT;
        foundCurrent = true;
      } else ( state = TrackingTraceState.PAST );
      
      const trace = { ... item, state};  
      this.trackingTraces.push(trace);
    });
    console.log('trace', this.trackingTraces);
  }

  buildPoints() {
    const length = this.container.w - this.circle_r - this.circle_r;
    this.step = length / (this.trackingTraces.length - 1);
    for (var i = 0; i < this.trackingTraces.length; i++) {
      const x = this.circle_r + (this.step * i)
      this.points.push({x: x, y: this.line_y});
    }
    console.log('points', this.points);
  }

  buildLines() {
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

  buildStops() {

    this.trackingTraces.map((item, i) => {
      const spot = new Spot(this.points[i]);
      const state = this.trackingTraces[i].state;
      spot.state = state;

      if (state === TrackingTraceState.PAST) {
        spot.radius = 7;
        spot.fill = 'white';
        spot.stroke = '#173A64';
        spot.stroke_width = 2;
        spot.tick = this.getTick(i);

      } else if (state === TrackingTraceState.FUTURE) {
        spot.radius = 8;
        spot.fill = '#CFCFCF';
      } else {
        spot.radius = 9;
        spot.fill = 'white';
        spot.stroke = '#173A64';
        spot.stroke_width = 2;
      }
      spot.radius = state === TrackingTraceState.PAST? 7 : state === TrackingTraceState.FUTURE? 8 : 9;

      this.spots.push(spot);
    });
    console.log('spots', this.spots);
  }

  private getTick(i:number) {
    const tick0 = { p1:{ x: 5.0, y: 27.6}, p2: {x: 6.3, y: 29.8}, p3: {x: 5.7, y: 29.8}, p4: {x: 11.2, y: 24.4} };
    let tick = { ...tick0 };
    let offset = i * this.step;
    tick.p1.x += offset;
    tick.p2.x += offset;
    tick.p3.x += offset;
    tick.p4.x += offset;
    return tick;
  }
}