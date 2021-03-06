import { COLORS, ORBITALS } from './constants';

import { Shell } from './shell.model';

export class Atom {

  id: number;

  hashtag: string;

  position: any;

  diameter: number;

  numElectrons: number;
  shells: Shell[];

  color: string;

  constructor(id: number, hashtag: string, x: number, y: number, diameter: number, numElectrons: number, color: string, sketch: any) {
    this.id = id;

    this.hashtag = hashtag;

    this.position = sketch.createVector(x, y);

    this.diameter = diameter;

    this.color = color;
    
    this.updateNumElectrons(numElectrons);
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

  updateNumElectrons(numElectrons: number) {
    if (!this.numElectrons || this.numElectrons !== numElectrons) {
      this.numElectrons = numElectrons;
      this.shells = [];
      this.getElectronConfiguration(numElectrons).forEach((numElectrons, index) => {
        this.shells.push(new Shell(this, index + 1, numElectrons, this.color));
      });
    }
  }

  updatePosition(position: any) {
    this.position = position;
    this.shells.forEach((shell) => {
      shell.position = position;
      shell.electrons.forEach((electron) => electron.shellPosition = position);
    });
  }

  updateColor(color: string) {
    this.color = color;
    this.shells.forEach((shell) => shell.updateColor(color));
  }

  draw(sketch: any) {
    this.shells.forEach((shell) => shell.draw(sketch));

    sketch.noStroke();
    sketch.fill(this.color);
    sketch.ellipse(this.position.x, this.position.y, this.diameter);

    sketch.fill(COLORS.WHITE)
    sketch.text(this.hashtag, this.position.x, this.position.y, this.diameter, this.diameter * 0.525);
  }

}
