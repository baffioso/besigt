import { Component } from '@angular/core';
import { of } from 'rxjs';
import { ProjectStoreService } from 'src/app/stores/project-store.service';

@Component({
  selector: 'app-projects',
  templateUrl: 'projects.page.html',
  styleUrls: ['projects.page.scss']
})
export class ProjectsPage {
  projects$ = this.projectStoreService.projects$;

  constructor(private projectStoreService: ProjectStoreService) { }

}
