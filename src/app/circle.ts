import { Point, Container } from './types';

export class Circle {
  point: Point;
  radius: number;
  fill: string;
  stroke: string;

  constructor(private container: Container) {
    this.fill = this.getColor();
    this.stroke = this.getSolidColor();

    this.setPoint();
    this.setRadius();
  }

  getSolidColor(): string {
    return this.getColor(1);
  }

  getColor(opacity?: number): string {
    opacity = opacity || Math.random();

    const r = Math.random() * 256;
    const g = Math.random() * 256;
    const b = Math.random() * 256;

    return `rgb(${r}, ${g}, ${b}, ${opacity})`;
  }

  setRadius() {
    const radius: number = Math.floor(Math.random() * 75);
    this.radius = Math.max(radius, 8);
  }

  setPoint() {
    const x = Math.floor(Math.random() * this.container.w);
    const y = Math.floor(Math.random() * this.container.h);
    this.point = { x, y };
  }
}