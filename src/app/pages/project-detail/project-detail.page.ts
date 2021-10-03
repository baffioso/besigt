/* eslint-disable arrow-body-style */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { ProjectStoreService } from '@app/stores/project-store.service';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.page.html',
  styleUrls: ['./project-detail.page.scss'],
})
export class ProjectDetailPage implements OnInit {

  selectedTab: 'detail' | 'photos' | 'map' = 'detail';

  project$ = this.route.paramMap.pipe(
    switchMap(paramMap => {
      return this.projectStore.projects$.pipe(
        map(projects => projects.find(project => project.id === paramMap.get('id')))
      );
    })
  );

  constructor(
    private projectStore: ProjectStoreService,
    private route: ActivatedRoute,

  ) { }

  ngOnInit() {
  }

  onTabChange(event) {
    this.selectedTab = event.detail.value;
  }
}
