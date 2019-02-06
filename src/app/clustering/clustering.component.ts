declare var require: any;

import { Component, OnInit } from '@angular/core';

import { ClusteringService } from './../shared/services/clustering.service';

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

  constructor(private clustering: ClusteringService) { }

  ngOnInit() {
    this.minValue = 1;
    this.maxValue = 65;
    this.stepValue = 2;
    this.startingValue = this.minSize = 5;

    this.createCanvas();
  }

  onSliderChanged(event: any) {
    this.minSize = event.value;
  }

  private createCanvas() {
    new p5((sketch: any) => {

      const getX = (x: number) => width / 2 + x * xOffset;
      const getY = (y: number) => height / 2 + y * yOffset;

      const width = sketch.windowWidth * 0.99;
      const height = sketch.windowHeight * 0.75;
      const framerate = 60;

      const diameter = width * .05;
      const moveFrequency = 180;

      var time = 0;
      var updateTime = true;

      var xOffset: number;
      var yOffset: number;

      sketch.setup = () => {
        sketch.createCanvas(width, height);
        sketch.frameRate(framerate);

        sketch.ellipseMode(sketch.CENTER);
        sketch.rectMode(sketch.CENTER);
        sketch.angleMode(sketch.DEGREES);

        sketch.textAlign(sketch.CENTER, sketch.CENTER);
        
        this.atoms = [];
      };

      sketch.draw = () => {
        sketch.clear();

        this.atoms.filter((atom) => atom.numElectrons >= this.minSize).forEach((atom) => atom.draw(sketch));
        if (time % moveFrequency === 1) {
          time++;
          updateTime = false;

          this.clustering.getClusters().subscribe((response: Response) => {
            if (this.atoms.length === 0) {
              xOffset = 0.3 * width / response['max_x'];
              yOffset = 0.2 * height / response['max_y'];
            //   this.atoms = response['clusters'].map((cluster: any) => {
            //     return new Atom(cluster.hashtag, getX(cluster.x), getY(cluster.y), diameter, cluster.size, sketch);
            //   });
            // } else {
            //   for (let i = 0; i < this.atoms.length; i++) {
            //     const atom = this.atoms[i];
            //     const cluster = response['clusters'][i];
            //     atom.hashtag = cluster.hashtag;
            //     atom.numElectrons = cluster.size;
            //     atom.velocity = sketch.createVector(getX(cluster.x) - atom.position.x, getY(cluster.y) - atom.position.y);
            //     atom.updatePosition();
            //   }
            }
            this.atoms = response['clusters'].map((cluster: any) => {
              return new Atom(cluster.hashtag, getX(cluster.x), getY(cluster.y), diameter, cluster.size, sketch);
            });

            updateTime = true;
          });
        }
        // this.atoms.forEach((atom) => atom.updatePosition());
        if (updateTime) {
          time++;
        }
      };

    }, this.sketchId);
  }

}
