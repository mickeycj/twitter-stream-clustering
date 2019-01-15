import { Component, OnInit } from '@angular/core';

import 'p5';

@Component({
  selector: 'app-clustering',
  templateUrl: './clustering.component.html',
  styleUrls: ['./clustering.component.scss']
})
export class ClusteringComponent implements OnInit {

  private sketchId = 'sketch-clustering';
  
  private sketch: any;

  constructor() { }

  ngOnInit() {
    this.sketch = this.createCanvas();
  }

  createCanvas() {
    return new p5((sketch: any) => {
      sketch.setup = () => {
        sketch.createCanvas(sketch.windowWidth * .9, sketch.windowHeight * .8);
        sketch.background('#BBBBBB');
      };

      sketch.draw = () => {

      };
    }, this.sketchId);
  }

}
