import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { AppState } from '@app/store/app.reducer';
import * as fromProject from '@app/state/project.actions';
import * as fromMap from '@app/state/map.actions';
import { ProjectWithRelations } from 'src/app/interfaces/project';
import { MapService } from '@app/services/map.service';

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
    private mapService: MapService
  ) { }

  goToProject(project: ProjectWithRelations) {
    this.mapService.removeProjectOverlays();

    this.store.dispatch(fromProject.selectedProject({ id: project.id }));
    this.store.dispatch(fromMap.zoomToProjectArea());
    this.store.dispatch(fromMap.addProjectAreaToMap());
    this.store.dispatch(fromMap.addProjectFeaturesToMap());
    this.store.dispatch(fromMap.addProjectPhotosToMap());

    this.router.navigate(['app', 'map']);
  }

}
