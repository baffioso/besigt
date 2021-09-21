import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProjectsPage } from './projects.page';

import { ProjectsPageRoutingModule } from './projects-routing.module';
import { ProjectListComponent } from '../../components/project-list/project-list.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ProjectsPageRoutingModule
  ],
  declarations: [ProjectsPage, ProjectListComponent]
})
export class ProjectsPageModule { }
