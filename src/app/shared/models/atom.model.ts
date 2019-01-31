import { COLORS, DRAG_RATIO, MAX_VELOCITY, MOVE_FREQUENCY, ORBITALS } from './constants';

import { Shell } from './shell.model';

export class Atom {

  hashtag: string;

  direction: any;
  position: any;
  velocity: any;

  diameter: number;

  numElectrons: number;
  shells: Shell[];

  bound: number;

  constructor(hashtag: string, x: number, y: number, diameter: number, numElectrons: number, sketch: any) {
    this.hashtag = hashtag;

    this.direction = {
      x: (Math.random()) < 0.5 ? 1 : -1,
      y: (Math.random()) < 0.5 ? 1 : -1
    };
    this.position = sketch.createVector(x, y);
    this.velocity = sketch.createVector(MAX_VELOCITY * this.direction.x, MAX_VELOCITY * this.direction.y);

    this.diameter = diameter;

    this.numElectrons = numElectrons;
    this.shells = [];
    this.getElectronConfiguration(numElectrons).forEach((numElectrons, index) => {
      this.shells.push(new Shell(this, index + 1, numElectrons));
    });

    this.bound = this.shells[this.shells.length - 1].diameter / 2;
    this.checkHorizontalBounds(sketch);
    this.checkVerticalBounds(sketch);
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

  checkHorizontalBounds(sketch: any) {
    if (this.position.x - this.bound < 0) {
      this.position.x = this.bound;
    }
    if (this.position.x + this.bound > sketch.windowWidth * .99) {
      this.position.x = sketch.windowWidth * .99 - this.bound;
    }
  }

  checkVerticalBounds(sketch: any) {
    if (this.position.y - this.bound < 0) {
      this.position.y = this.bound;
    }
    if (this.position.y + this.bound > sketch.windowHeight * .8) {
      this.position.y = sketch.windowHeight * .8 - this.bound;
    }
  }

  draw(sketch: any) {
    this.shells.forEach((shell) => shell.draw(sketch));

    sketch.noStroke();
    sketch.fill(COLORS.GRAY);
    sketch.ellipse(this.position.x, this.position.y, this.diameter);

    sketch.fill(COLORS.WHITE);
    sketch.text(this.hashtag, this.position.x, this.position.y, this.diameter, this.diameter / 2);

    if (sketch.frameCount % MOVE_FREQUENCY === 0) {
      this.velocity = sketch.createVector(MAX_VELOCITY * this.direction.x, MAX_VELOCITY * this.direction.y);
    }
    if (this.position.x - this.bound < 0 || this.position.x + this.bound > sketch.windowWidth * .99) {
      this.checkHorizontalBounds(sketch);
      this.velocity.x = -this.velocity.x;
      this.direction.x = -this.direction.x;
    }
    if (this.position.y - this.bound < 0 || this.position.y + this.bound > sketch.windowHeight * .8) {
      this.checkVerticalBounds(sketch);
      this.velocity.y = -this.velocity.y;
      this.direction.y = -this.direction.y;
    }
    this.position.add(this.velocity);
    this.velocity.mult(1.0 - DRAG_RATIO);
  }

}
