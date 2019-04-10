import { COLORS, ELECTRON, SHELL_RATIO } from './constants';

import { Atom } from './atom.model';
import { Electron } from './electron.model';

export class Shell {

  position: any;

  diameter: number;
  level: number;
  electronDiameter: number;

  electrons: Electron[];

  color: string;

  constructor(atom: Atom, level: number, numElectrons: number, color: string) {
    this.position = atom.position;
    this.diameter = atom.diameter + atom.diameter * level / SHELL_RATIO;
    this.level = level;
    this.electronDiameter = atom.diameter / ELECTRON.RATIO;

    this.electrons = [];
    for (let angle = -90; angle > -450; angle -= 360 / numElectrons) {
      this.electrons.push(new Electron(this, angle, this.electronDiameter, color));
    }

    this.color = color;
  }

  draw(sketch: any) {
    this.electrons.forEach((electron) => electron.draw(sketch));
    
    sketch.stroke(this.color);
    sketch.noFill();
    sketch.ellipse(this.position.x, this.position.y, this.diameter);
  }

}
