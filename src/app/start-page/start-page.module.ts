import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StartPageComponent } from './components/start-page/start-page.component';
import {RouterModule} from "@angular/router";
import { NoPageFoundComponent } from './components/no-page-found/no-page-found.component';



@NgModule({
  declarations: [
    StartPageComponent,
    NoPageFoundComponent
  ],
  imports: [
    CommonModule, RouterModule
  ]
})
export class StartPageModule { }
