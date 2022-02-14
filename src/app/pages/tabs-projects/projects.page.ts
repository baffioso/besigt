import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { AppState } from '@app/store/app.reducer';
import * as projectActions from '@app/pages/tabs-projects/store/project.actions';
import * as mapActions from '@app/pages/tabs-map/store/map.actions';
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

    this.store.dispatch(mapActions.removeProjectMapOverlays());

    this.store.dispatch(projectActions.selectedProject({ id: project.id }));
    this.store.dispatch(mapActions.zoomToProjectArea());
    this.store.dispatch(mapActions.addProjectAreaToMap());
    this.store.dispatch(mapActions.addProjectFeaturesToMap());
    this.store.dispatch(mapActions.addProjectPhotosToMap());

    this.router.navigate(['app', 'map']);
  }

}
