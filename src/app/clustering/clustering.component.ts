declare var require: any;

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

  private minSize: number;

  minValue: number;
  maxValue: number;
  stepValue: number;
  startingValue: number;

  private data = [
    {
      hashtag: '#first',
      numElectrons: 117
    },
    {
      hashtag: '#second',
      numElectrons: 18
    },
    {
      hashtag: '#third',
      numElectrons: 64
    },
    {
      hashtag: '#fourth',
      numElectrons: 8
    },
    {
      hashtag: '#fifth',
      numElectrons: 99
    },
    {
      hashtag: '#sixth',
      numElectrons: 27
    },
    {
      hashtag: '#seventh',
      numElectrons: 52
    },
    {
      hashtag: '#eigth',
      numElectrons: 32
    },
    {
      hashtag: '#ninth',
      numElectrons: 43
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

      const width = sketch.windowWidth * 0.99;
      const height = sketch.windowHeight * 0.75;
      const framerate = 60;
      const buffer = 400;

      const diameter = width * .035;

      const randomPosition = () => {
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
          return new Atom(datum.hashtag, x, y, diameter, datum.numElectrons, sketch);
        });
      };

      sketch.draw = () => {
        sketch.clear();

        this.atoms.filter((atom) => atom.numElectrons >= this.minSize).forEach((atom) => atom.draw(sketch));
      };

    }, this.sketchId);
  }

}
