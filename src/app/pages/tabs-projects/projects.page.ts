import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { AppState } from '@app/store/app.reducer';
import { MapActions, ProjectActions } from '@app/store/action-types';
import { ProjectWithRelations } from 'src/app/interfaces/project';

@Component({
  selector: 'app-projects',
  templateUrl: 'projects.page.html',
  styleUrls: ['projects.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsPage {
  projects$ = this.store.select('project', 'projects');

  selectedProject$ = this.store.select('project', 'selectedProject');

  constructor(
    private router: Router,
    private store: Store<AppState>,
  ) { }

  goToProject(project: ProjectWithRelations) {

    this.store.dispatch(ProjectActions.selectedProject({ id: project.id }));
    this.store.dispatch(MapActions.zoomToProjectArea());

    this.router.navigate(['app', 'map']);
  }

}
