import { Component, OnInit } from '@angular/core';
import { MapService } from 'src/app/services/map.service';

@Component({
  selector: 'app-map-geolocation',
  templateUrl: './map-geolocation.component.html',
  styleUrls: ['./map-geolocation.component.scss'],
})
export class MapGeolocationComponent implements OnInit {

  constructor(private mapService: MapService) { }

  ngOnInit() { }

  onToggleGeolocate(): void {
    this.mapService.startGeolocate();
  }

}
