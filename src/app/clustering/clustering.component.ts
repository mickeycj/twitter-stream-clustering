import { Component, OnInit } from '@angular/core';

import { Atom } from './../shared/models/atom.model';

import 'p5';

@Component({
  selector: 'app-clustering',
  templateUrl: './clustering.component.html',
  styleUrls: ['./clustering.component.scss']
})
export class ClusteringComponent implements OnInit {

  private sketchId = 'sketch-clustering';
  
  private sketch: any;

  private atoms: Atom[];

  private data = [
    {
      hashtag: '#first',
      numElectrons: 10
    },
    {
      hashtag: '#second',
      numElectrons: 20
    },
    {
      hashtag: '#third',
      numElectrons: 30
    }
  ];

  constructor() { }

  ngOnInit() {
    this.sketch = this.createCanvas();
  }

  createCanvas() {
    return new p5((sketch: any) => {

      let width = sketch.windowWidth * .9;
      let height = sketch.windowHeight * .8;
      let diameter = width * .05;

      let randomPosition = () => {
        return {
          x: Math.random() * (width - 240) + 120,
          y: Math.random() * (height - 240) + 120
        };
      };

      sketch.setup = () => {
        sketch.createCanvas(width, height);
        sketch.background('#BBBBBB');

        this.atoms = this.data.map((datum) => {
          const { x, y } = randomPosition();
          return new Atom(datum.hashtag, x, y, diameter, datum.numElectrons);
        });
      };

      sketch.draw = () => {
        this.atoms.forEach((atom) => atom.draw(sketch));
      };

    }, this.sketchId);
  }

}
