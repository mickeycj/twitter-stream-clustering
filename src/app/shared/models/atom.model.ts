import { COLORS, ORBITALS } from './constants';

import { Shell } from './shell.model';

export class Atom {

  hashtag: string;

  x: number;
  y: number;
  diameter: number;

  numElectrons: number;
  shells: Shell[];

  constructor(hashtag: string, x: number, y: number, diameter: number, numElectrons: number) {
    this.hashtag = hashtag;

    this.x = x;
    this.y = y;
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

  draw(sketch: any) {
    this.shells.forEach((shell) => shell.draw(sketch));

    sketch.noStroke();
    sketch.fill(COLORS.GRAY);
    sketch.ellipse(this.x, this.y, this.diameter);

    sketch.fill(COLORS.WHITE);
    sketch.text(this.hashtag, this.x, this.y, this.diameter, this.diameter / 2);
  }

}
