import { Component, OnInit } from '@angular/core';
import { UiStateService } from '@app/stores/ui-state.service';
import { mergeMap, pluck, tap } from 'rxjs/operators';
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
    private userNotificationService: UserNotificationService,
    private uiState: UiStateService
  ) { }

  ngOnInit() {

    this.uiState.uiState$.pipe(
      pluck('uploadingImage'),
      mergeMap(uploading => {
        if (uploading) {
          return this.userNotificationService.presentLoading('Uploader billede');
        } else {
          return this.userNotificationService.dismissLoading();
        }
      })
    ).subscribe();
  }

  activateAddressInfo() {
    this.uiState.shiftMapTool('addressInfo');
  }

  onAddPhoto() {

    this.projectStore.addPhoto().pipe(
      tap(() => {
        this.userNotificationService.presentToast(
          {
            message: 'Dit billede blev gemt',
            color: 'success',
            duration: 2500,
            position: 'top'
          });
      })
    ).subscribe();
  }

  startTracking() {
    this.geolocationService.startTracking();
    this.geolocationService.trackingPositions$.subscribe(console.log);
  }

}
