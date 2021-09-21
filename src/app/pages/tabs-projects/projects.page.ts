import { Component } from '@angular/core';
import { of } from 'rxjs';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-projects',
  templateUrl: 'projects.page.html',
  styleUrls: ['projects.page.scss']
})
export class ProjectsPage {
  projects$ = this.storeService.projects$;

  constructor(private storeService: StoreService) { }

}
