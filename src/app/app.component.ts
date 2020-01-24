import { Component } from "@angular/core";
import { Circle } from "./circle";
import { Point, Container } from "./types";
import { TrackingTrace, TimeLine, Line } from "./timeline";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.svg",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {

  timeLine: TimeLine;

  clicked: boolean;
  circles: Circle[] = [];
  lines: Line[] = [];
  container: Container = { w: 475, h: 54 };

  sample1: TrackingTrace[] = [
    {
      title: "In POD",
      isCurrent: false,
      message: ""
    },
    {
      title: "Origin",
      isCurrent: false,
      message: ""
    },
    {
      title: "On Water",
      isCurrent: true,
      message: "Arriving in 48h"
    },
    {
      title: "In POA",
      isCurrent: false,
      message: ""
    }
  ];

  constructor() {
    this.timeLine = new TimeLine(this.container, this.sample1);
  }

}
