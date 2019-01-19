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

  private atoms: Atom[];

  minValue: number;
  maxValue: number;
  stepValue: number;
  startingValue: number;

  minSize: number;

  private data = [
    {
      hashtag: '#first',
      numElectrons: 117
    },
    {
      hashtag: '#second',
      numElectrons: 32
    },
    {
      hashtag: '#third',
      numElectrons: 8
    }
  ];

  constructor() { }

  ngOnInit() {
    this.minValue = 1;
    this.maxValue = 115;
    this.stepValue = 5;
    this.startingValue = this.minSize = 25;

    this.createCanvas();
  }

  onSliderChanged(event: any) {
    this.minSize = event.value;
  }

  private createCanvas() {
    new p5((sketch: any) => {

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

        this.atoms.filter((atom) => atom.numElectrons >= this.minSize).forEach((atom) => atom.draw(sketch));
      };

    }, this.sketchId);
  }

}
