import { Component, OnInit } from '@angular/core';
import { GeolocationService } from 'src/app/services/geolocation.service';
import { UserNotificationService } from 'src/app/shared/userNotification.service';
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
    private geolocationService: GeolocationService,
    private userNotificationService: UserNotificationService
  ) { }

  ngOnInit() { }

  async onAddPhoto() {
    const loading = await this.userNotificationService.presentLoading('Uploader billede');
    await this.projectStore.addPhoto();
    loading.dismiss();
    this.userNotificationService.presentToast(
      {
        message: 'Dit billede blev gemt',
        color: 'success',
        duration: 2500,
        position: 'top'
      });
  }

  startTracking() {
    this.geolocationService.startTracking();
    this.geolocationService.trackingPositions$.subscribe(console.log);
  }

}
