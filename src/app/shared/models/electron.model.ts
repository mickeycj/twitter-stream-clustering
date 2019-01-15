import { COLORS, ELECTRON } from './constants';

import { Shell } from './shell.model';

export class Electron {

  shellX: number;
  shellY: number;
  shellRadius: number;
  shellSpeedOffset: number;

  angle: number;

  electronDiameter: number;

  constructor(shell: Shell, angle: number, electronDiameter: number) {
    this.shellX = shell.x;
    this.shellY = shell.y;
    this.shellRadius = shell.diameter / 2;
    this.shellSpeedOffset = shell.level - ELECTRON.SPEED_OFFSET;

    this.angle = angle;
    console.log(angle);

    this.electronDiameter = electronDiameter;
  }

  draw(sketch) {
    const x = this.shellX + this.shellRadius * sketch.cos(this.angle);
    const y = this.shellY + this.shellRadius * sketch.sin(this.angle);

    sketch.noStroke();
    sketch.fill(COLORS.GRAY);
    sketch.ellipse(x, y, this.electronDiameter);

    this.angle -= ELECTRON.SPEED / this.shellSpeedOffset;
  }

}
