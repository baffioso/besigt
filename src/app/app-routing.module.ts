import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'map-layers-control-modal',
    loadChildren: () => import('./pages/map-layers-control-modal/map-layers-control-modal.module').then(m => m.MapLayersControlModalPageModule)
  },
  {
    path: 'map-geosearch-modal',
    loadChildren: () => import('./pages/map-geosearch-modal/map-geosearch-modal.module').then( m => m.MapGeosearchModalPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
