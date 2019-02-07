declare var require: any;

import { COLORS, DRAG_RATIO, ORBITALS } from './constants';

import { Shell } from './shell.model';

const p5 = require('p5');

export class Atom {

  hashtag: string;

  direction: any;
  position: any;
  velocity: any;

  diameter: number;

  numElectrons: number;
  shells: Shell[];

  constructor(hashtag: string, x: number, y: number, diameter: number, numElectrons: number, sketch: any) {
    this.hashtag = hashtag;

    this.position = sketch.createVector(x, y);
    this.velocity = sketch.createVector(0, 0);

    this.diameter = diameter;

    this.numElectrons = numElectrons;
    this.shells = [];
    this.getElectronConfiguration(numElectrons).forEach((numElectrons, index) => {
      this.shells.push(new Shell(this, index + 1, numElectrons));
    });
  }

  getElectronConfiguration(numElectrons: number) {
    let orbitals = '';
    for (let i = 0; numElectrons > 0 && i < ORBITALS.length; i++) {
      const { name, size } = ORBITALS[i];
      numElectrons -= size;
      const numInOrbital = (numElectrons < 0) ? (size - Math.abs(numElectrons)) : size;
      orbitals = orbitals.concat(name + numInOrbital + ' ');
    }
    orbitals = orbitals.substring(0, orbitals.length - 1);

    const configuration = [];
    orbitals.split(' ').forEach((orbital) => {
      const orbitalArr = orbital.split(/[a-z]/g);
      const level = parseInt(orbitalArr[0]) - 1;
      const numElectrons = parseInt(orbitalArr[1]);
      if (configuration[level]) {
        configuration[level] += numElectrons;
      } else {
        configuration[level] = numElectrons;
      }
    });

    return configuration;
  }

  updatePosition() {
    this.position.add(this.velocity);
    this.velocity.mult(1.0 - DRAG_RATIO);
  }

  draw(sketch: any) {
    this.shells.forEach((shell) => shell.draw(sketch));

    sketch.noStroke();
    sketch.fill(COLORS.WHITE);
    sketch.ellipse(this.position.x, this.position.y, this.diameter);
  }

  text(sketch: any) {
    sketch.fill(COLORS.GRAY)
    sketch.text('#' + this.hashtag, this.position.x, this.position.y, this.diameter, this.diameter / 2);
  }

}
