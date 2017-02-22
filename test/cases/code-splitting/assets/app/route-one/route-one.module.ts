import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { RouteOneComponent } from './route-one.component';

export const ROUTER_CONFIG: Routes = [
  { path: '', component: RouteOneComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTER_CONFIG)
  ],
  bootstrap: [
    RouteOneComponent
  ],
  declarations: [
    RouteOneComponent
  ]
})
export class RouteOneModule {}
