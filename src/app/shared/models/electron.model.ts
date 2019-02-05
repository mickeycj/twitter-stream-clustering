import { COLORS, ELECTRON } from './constants';

import { Shell } from './shell.model';

export class Electron {

  shellPosition: any;
  
  shellRadius: number;
  shellSpeedOffset: number;

  angle: number;

  electronDiameter: number;

  constructor(shell: Shell, angle: number, electronDiameter: number) {
    this.shellPosition = shell.position;
    this.shellRadius = shell.diameter / 2;
    this.shellSpeedOffset = shell.level - ELECTRON.SPEED_OFFSET;

    this.angle = angle;

    this.electronDiameter = electronDiameter;
  }

  draw(sketch: any) {
    const x = this.shellPosition.x + this.shellRadius * sketch.cos(this.angle);
    const y = this.shellPosition.y + this.shellRadius * sketch.sin(this.angle);

    sketch.noStroke();
    sketch.fill(COLORS.WHITE);
    sketch.ellipse(x, y, this.electronDiameter);

    this.angle -= ELECTRON.SPEED / this.shellSpeedOffset;
  }

}
