import { AfterViewInit, Component } from '@angular/core';
import { MapService } from 'src/app/services/map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements AfterViewInit {

  private center: [number, number] = [1360103, 7491908];
  private zoom = 13;

  constructor(private mapService: MapService) { }

  ngAfterViewInit() {
    this.mapService.createMap(this.center, this.zoom);

    setTimeout(() => {
      this.mapService.resize();
    }, 500);
  }

}
