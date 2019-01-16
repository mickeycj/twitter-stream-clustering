import { Component, OnInit } from '@angular/core';

import { Atom } from './../shared/models/atom.model';

const p5 = require('p5');

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
      numElectrons: 8
    },
    {
      hashtag: '#second',
      numElectrons: 32
    },
    {
      hashtag: '#third',
      numElectrons: 117
    }
  ];

  constructor() { }

  ngOnInit() {
    this.sketch = this.createCanvas();
  }

  createCanvas() {
    return new p5((sketch: any) => {

      let width = sketch.windowWidth * .99;
      let height = sketch.windowHeight * .8;
      let background = '#FFFFFF';
      let framerate = 60;
      let buffer = 400;

      let diameter = width * .05;

      let randomPosition = () => {
        return {
          x: Math.random() * (width - buffer) + buffer / 2,
          y: Math.random() * (height - buffer) + buffer / 2
        };
      };

      sketch.setup = () => {
        sketch.createCanvas(width, height);
        sketch.frameRate(framerate);

        sketch.ellipseMode(sketch.CENTER);
        sketch.rectMode(sketch.CENTER);
        sketch.angleMode(sketch.DEGREES);

        sketch.textAlign(sketch.CENTER, sketch.CENTER);
        
        this.atoms = this.data.map((datum) => {
          const { x, y } = randomPosition();
          return new Atom(datum.hashtag, x, y, diameter, datum.numElectrons);
        });
      };

      sketch.draw = () => {
        sketch.background(background);

        this.atoms.forEach((atom) => atom.draw(sketch));
      };

    }, this.sketchId);
  }

}
