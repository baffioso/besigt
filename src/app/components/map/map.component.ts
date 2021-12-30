import { AfterViewInit, Component } from '@angular/core';
import { AppState } from '@app/store/app.reducer';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { MapService } from 'src/app/services/map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements AfterViewInit {

  showMapCenter$ = this.store.select('mapTool', 'activatedMapTools').pipe(
    map(tools => tools.includes('takePhoto'))
  )

  private center: [number, number] = [1360103, 7491908];
  private zoom = 13;

  constructor(
    private mapService: MapService,
    private store: Store<AppState>
  ) { }

  ngAfterViewInit() {
    this.mapService.createMap(this.center, this.zoom);
  }

}
