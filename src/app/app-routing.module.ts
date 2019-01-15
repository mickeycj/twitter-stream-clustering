import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClusteringComponent } from './clustering/clustering.component';
import { DetailComponent } from './detail/detail.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: ClusteringComponent
  },
  {
    path: 'detail/:id',
    component: DetailComponent
  },
  {
    path: 'about',
    component: AboutComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
