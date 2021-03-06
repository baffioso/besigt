import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { ViewState } from 'src/app/interfaces/map-state';
import { ProjectWithRelations } from 'src/app/interfaces/project';
import { MapService } from 'src/app/services/map.service';
import { ProjectStoreService } from 'src/app/stores/project-store.service';

@Component({
  selector: 'app-projects',
  templateUrl: 'projects.page.html',
  styleUrls: ['projects.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsPage {
  projects$ = this.projectStoreService.projects$.pipe(
    map(projects => projects.sort((a, b) => new Date(b.inserted_at) as any - (new Date(a.inserted_at) as any)))
  );

  currentdProjectId$ = this.projectStoreService.currentProjectId$;

  constructor(
    private projectStoreService: ProjectStoreService,
    private router: Router,
    private mapService: MapService
  ) { }

  goToProject(project: ProjectWithRelations) {
    this.projectStoreService.setCurrentProjectId(project.id);
    const viewState: ViewState = project.map_state[0].map_state;
    this.mapService.flyTo(viewState.center as [number, number], viewState.zoom);
    this.router.navigateByUrl('/app/map');
  }

}
