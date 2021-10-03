import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'app',
    component: TabsPage,
    children: [
      {
        path: 'map',
        loadChildren: () => import('../tabs-map/map.module').then(m => m.MapPageModule)
      },
      {
        path: 'projects',
        canLoad: [AuthGuard],
        children: [
          {
            path: '',
            loadChildren: () => import('../tabs-projects/projects.module').then(m => m.ProjectsPageModule),
            pathMatch: 'full'
          },
          {
            path: 'create',
            loadChildren: () => import('../project-create/project-create.module').then(m => m.ProjectCreatePageModule)
          },
          {
            path: ':id',
            loadChildren: () => import('../project-detail/project-detail.module').then(m => m.ProjectDetailPageModule)
          }
        ]
      },
      {
        path: 'settings',
        loadChildren: () => import('../tabs-settings/settings.module').then(m => m.SettingsPageModule)
      },
      {
        path: '',
        redirectTo: '/app/map',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/app/map',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule { }
