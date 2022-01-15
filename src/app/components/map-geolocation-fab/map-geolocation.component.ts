import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MapService } from 'src/app/services/map.service';
import { MapStoreService } from 'src/app/stores/map-store.service';
import { pluck } from 'rxjs/operators';

@Component({
  selector: 'app-map-geolocation',
  templateUrl: './map-geolocation.component.html',
  styleUrls: ['./map-geolocation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapGeolocationComponent implements OnInit {

  tracking$ = this.mapStoreService.mapstate$.pipe(
    pluck('tracking')
  );
  locating$ = this.mapStoreService.mapstate$.pipe(
    pluck('locating')
  );

  tracking = false;


  constructor(private mapService: MapService, private mapStoreService: MapStoreService) { }

  ngOnInit() {
  }

  onToggleGeolocate(): void {
    if (!this.tracking) {
      this.tracking = true;
      this.mapService.startTracking();
    } else {
      this.tracking = false;
      this.mapService.stopTracking();
    }

  }

}
