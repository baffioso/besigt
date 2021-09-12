import { Injectable } from '@angular/core';

import Map from 'ol/Map';
import View from 'ol/View';
import ImageWMS from 'ol/source/ImageWMS';
import { Image as ImageLayer, Tile as TileLayer } from 'ol/layer';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import MapboxVector from 'ol/layer/MapboxVector';
import Feature from 'ol/Feature';
import Geolocation from 'ol/Geolocation';
import Point from 'ol/geom/Point';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';
import { ScaleLine } from 'ol/control';

import { Layer } from '../interfaces/map-layer-source';
import { MapStoreService } from '../stores/map-store.service';


@Injectable({
  providedIn: 'root'
})
export class MapService {
  private olmap: Map;
  private geolocation: Geolocation;

  constructor(private mapStoreService: MapStoreService) { }

  createMap(): void {

    this.olmap = new Map({
      controls: [
        new ScaleLine({
          units: 'metric',
        }),
      ],
      layers: [
        new MapboxVector({
          styleUrl: 'mapbox://styles/mapbox/bright-v9',
          accessToken: 'pk.eyJ1IjoiYmFmZmlvc28iLCJhIjoiY2tyYjFrZDlsMTF6ZzJ6cDhkdDg2bW15cSJ9.afJAXgWRc8yRd50I5WFhAQ'
        }),
      ],
      target: 'ol-map',
      view: new View({
        center: [1360103, 7491908],
        projection: 'EPSG:3857',
        zoom: 13,
      }),
    });

    // this.olmap.getControls().forEach(control => {
    //   this.olmap.removeControl(control);
    // });

  }

  resize() {
    this.olmap.updateSize();
  }

  addLayer(url: string, layer: Layer): void {
    const l = new ImageLayer({
      properties: { name: layer.name },
      minZoom: layer.minZoom || 12,
      opacity: layer.opacity,
      source: new ImageWMS({
        url,
        projection: 'EPSG:25832',
        params: {
          layers: layer.name,
          CRS: 'EPSG:25832'
        },
        ratio: 1
      }),
    });

    this.olmap.addLayer(l);
  }

  removeLayer(layerName: string): void {
    this.olmap.getLayers().getArray()
      .filter(layer => layer.get('name') === layerName)
      .forEach(layer => this.olmap.removeLayer(layer));
  }

  startTracking(): void {
    this.mapStoreService.updateMapState('locating', true);

    this.geolocation = new Geolocation({
      // enableHighAccuracy must be set to true to have the heading value.
      trackingOptions: {
        enableHighAccuracy: true,
      },
      projection: this.olmap.getView().getProjection(),
    });

    const accuracyFeature = new Feature();

    this.geolocation.on('change:accuracyGeometry', () => {
      accuracyFeature.setGeometry(this.geolocation.getAccuracyGeometry());
    });

    const positionFeature = new Feature();
    positionFeature.setStyle(
      new Style({
        image: new CircleStyle({
          radius: 6,
          fill: new Fill({
            color: '#3399CC',
          }),
          stroke: new Stroke({
            color: '#fff',
            width: 2,
          }),
        }),
      })
    );

    this.geolocation.on('change:position', () => {
      this.mapStoreService.updateMapState('locating', false);

      const coordinates = this.geolocation.getPosition();
      positionFeature.setGeometry(coordinates ? new Point(coordinates) : null);
      this.olmap.getView().animate({
        center: coordinates,
        zoom: 18,
        duration: 1000
      });
    });

    const vl = new VectorLayer({
      properties: { name: 'geolocation' },
      source: new VectorSource({
        features: [accuracyFeature, positionFeature],
      }),
    });

    this.olmap.addLayer(vl);

    this.geolocation.setTracking(true);
    this.mapStoreService.updateMapState('tracking', true);
  }

  stopTracking(): void {
    this.removeLayer('geolocation');
    this.geolocation.setTracking(false);
    this.mapStoreService.updateMapState('tracking', false);
  }


}
