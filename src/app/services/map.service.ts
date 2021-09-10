import { Injectable } from '@angular/core';
import { Map, LngLatLike, GeolocateControl } from 'mapbox-gl';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private mapGl: Map;
  private style = 'mapbox://styles/mapbox/streets-v11';
  private center: LngLatLike = [12.576634, 55.678649];
  private zoom = 15;
  private accessToken = 'pk.eyJ1IjoiYmFmZmlvc28iLCJhIjoiY2tyYjFrZDlsMTF6ZzJ6cDhkdDg2bW15cSJ9.afJAXgWRc8yRd50I5WFhAQ';

  constructor() { }

  createMap(): void {
    this.mapGl = new Map({
      container: 'map',
      style: this.style,
      center: this.center,
      zoom: this.zoom,
      accessToken: this.accessToken,
      attributionControl: false
    });

    this.addControls();

    this.mapGl.on('load', () => this.load());
  }

  public resize() {
    this.mapGl.resize();
  }

  private load() {
    this.resize();
  }

  private addControls() {
    this.mapGl.addControl(
      new GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true
      }),
      'bottom-right'
    );
  }

}
