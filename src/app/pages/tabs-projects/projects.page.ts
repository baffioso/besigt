import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { ViewState } from 'src/app/interfaces/map-state';
import { MapService } from 'src/app/services/map.service';
import { ProjectStoreService } from 'src/app/stores/project-store.service';

@Component({
  selector: 'app-projects',
  templateUrl: 'projects.page.html',
  styleUrls: ['projects.page.scss']
})
export class ProjectsPage {
  projects$ = this.projectStoreService.projects$;

  constructor(
    private projectStoreService: ProjectStoreService,
    private router: Router,
    private mapService: MapService
  ) { }

  goToProject(project: any) {
    const viewState: ViewState = project.map_state[0].map_state;
    this.mapService.flyTo(viewState.center as [number, number], viewState.zoom);
    this.router.navigateByUrl('/app/map');
  }

}
