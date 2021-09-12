import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'app',
    component: TabsPage,
    children: [
      {
        path: 'kort',
        loadChildren: () => import('../tabs-map/map.module').then(m => m.MapPageModule)
      },
      {
        path: 'tab2',
        loadChildren: () => import('../tabs-projects/tab2.module').then(m => m.Tab2PageModule)
      },
      {
        path: 'tab3',
        loadChildren: () => import('../tabs-settings/tab3.module').then(m => m.Tab3PageModule)
      },
      {
        path: '',
        redirectTo: '/app/kort',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/app/kort',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule { }
