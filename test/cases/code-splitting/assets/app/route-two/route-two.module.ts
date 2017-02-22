import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { RouteTwoComponent } from './route-two.component';

export const ROUTER_CONFIG: Routes = [
  { path: '', component: RouteTwoComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTER_CONFIG)
  ],
  bootstrap: [
    RouteTwoComponent
  ],
  declarations: [
    RouteTwoComponent
  ]
})
export class RouteTwoModule {}
