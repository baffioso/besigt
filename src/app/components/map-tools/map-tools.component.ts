import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@app/store/app.reducer';
import * as mapToolActions from '@app/state/map-tool.actions';
import { UiStateService } from '@app/stores/ui-state.service';
import { mergeMap, pluck, tap } from 'rxjs/operators';
import { GeolocationService } from 'src/app/services/geolocation.service';
import { UserNotificationService } from 'src/app/shared/userNotification.service';
import { ProjectStoreService } from 'src/app/stores/project-store.service';
import { MapTool } from '@app/state/map-tool.reducer';

@Component({
  selector: 'app-map-tools',
  templateUrl: './map-tools.component.html',
  styleUrls: ['./map-tools.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapToolsComponent implements OnInit {

  selectedProject$ = this.store.select('project', 'selectedProject');
  activatedMapTools$ = this.store.select('mapTool', 'activatedMapTools');

  constructor(
    private projectStore: ProjectStoreService,
    private geolocationService: GeolocationService,
    private userNotificationService: UserNotificationService,
    private uiState: UiStateService,
    private store: Store<AppState>
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

  activateTool(tool: MapTool) {
    this.store.dispatch(mapToolActions.shiftMapTool({ tool }))
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
