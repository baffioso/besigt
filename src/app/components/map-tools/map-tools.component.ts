import { Component, OnInit } from '@angular/core';
import { GeolocationService } from 'src/app/services/geolocation.service';
import { ProjectStoreService } from 'src/app/stores/project-store.service';

@Component({
  selector: 'app-map-tools',
  templateUrl: './map-tools.component.html',
  styleUrls: ['./map-tools.component.scss'],
})
export class MapToolsComponent implements OnInit {

  currentProject$ = this.projectStore.currentProject$;

  constructor(
    private projectStore: ProjectStoreService,
    private geolocationService: GeolocationService
  ) { }

  ngOnInit() { }

  onAddPhoto() {
    this.projectStore.addPhoto();
  }

  startTracking() {
    this.geolocationService.startTracking();
    this.geolocationService.trackingPositions$.subscribe(console.log);
  }

}
