import { AfterViewInit, Component } from '@angular/core';
import { tap } from 'rxjs/operators';
import { MapService } from 'src/app/services/map.service';
import { ProjectStoreService } from 'src/app/stores/project-store.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements AfterViewInit {

  private center: [number, number] = [1360103, 7491908];
  private zoom = 13;

  constructor(
    private mapService: MapService,
    private projectStore: ProjectStoreService,
  ) { }

  ngAfterViewInit() {
    this.mapService.createMap(this.center, this.zoom);
  }

}
