import { NgModule } from '@angular/core';

import {
  MatButtonModule,
  MatIconModule,
  MatMenuModule,
  MatSliderModule,
  MatToolbarModule
} from '@angular/material';

@NgModule({
  exports: [
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatSliderModule,
    MatToolbarModule
  ]
})
export class MaterialModule { }
