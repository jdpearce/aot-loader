import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';

export const ROUTER_CONFIG: Routes = [
  { path: 'one', loadChildren: './route-one/route-one.module#RouteOneModule' },
  { path: 'two', loadChildren: './route-two/route-two.module#RouteTwoModule' }
];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTER_CONFIG)
  ],
  bootstrap: [
    AppComponent
  ],
  declarations: [
    AppComponent
  ]
})
export class AppModule {}
