import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TapMapPage } from './map.page';

const routes: Routes = [
  {
    path: '',
    component: TapMapPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapPageRoutingModule { }
