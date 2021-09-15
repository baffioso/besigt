import { Injectable } from '@angular/core';

import Map from 'ol/Map';
import View from 'ol/View';
import ImageWMS from 'ol/source/ImageWMS';
import { Image as ImageLayer, Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import VectorSource from 'ol/source/Vector';
// import MapboxVector from 'ol/layer/MapboxVector';
import Feature from 'ol/Feature';
import Geolocation from 'ol/Geolocation';
import Point from 'ol/geom/Point';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';
import { ScaleLine } from 'ol/control';
import { transform } from 'ol/proj';
import TileWMS from 'ol/source/TileWMS';
import { register } from 'ol/proj/proj4';
import proj4 from 'proj4';

import { Layer } from '../interfaces/map-layer-source';
import { MapStoreService } from '../stores/map-store.service';
import { MapLayersService } from './map-layers.service';
import BaseLayer from 'ol/layer/Base';


@Injectable({
  providedIn: 'root'
})
export class MapService {

  viewProjection = 'EPSG:3857';

  private olmap: Map;
  private geolocation: Geolocation;


  constructor(private mapStoreService: MapStoreService, private mapLayersService: MapLayersService) { }

  createMap(): void {

    proj4.defs('EPSG:25832', '+proj=utm +zone=32 +ellps=GRS80 +units=m +no_defs');
    register(proj4);

    this.olmap = new Map({
      controls: [
        new ScaleLine({
          units: 'metric',
        }),
      ],
      layers: [
        this.mapLayersService.getBaseMapById('aerial').map
      ],
      target: 'ol-map',
      view: new View({
        center: [1360103, 7491908],
        projection: this.viewProjection,
        zoom: 13,
      }),
    });

  }

  changeBaseMap(layerName: 'aerial' | 'streets' | 'hillshade') {
    const layers = this.olmap.getLayers().getArray();
    this.olmap.removeLayer(layers[0]);
    this.olmap.getLayers().insertAt(0, this.mapLayersService.getBaseMapById(layerName).map);
  }

  flyTo(coordinates: [number, number]): void {
    this.olmap.getView().animate({
      center: transform(coordinates, 'EPSG:4326', this.viewProjection),
      zoom: 18,
      duration: 1000
    });
  }


  resize() {
    this.olmap.updateSize();
  }

  addLayer(url: string, layer: Layer): void {

    const wmsLayer = new TileLayer({
      properties: { name: layer.name },
      minZoom: layer.minZoom || 12,
      opacity: layer.opacity,
      source: new TileWMS({
        projection: 'EPSG:25832',
        url,
        params: {
          layers: layer.name,
          'VERSION': '1.1.1',
          'TRANSPARENT': 'TRUE',
          'FORMAT': 'image/png',
        }
      })
    });

    this.olmap.addLayer(wmsLayer);
  }

  removeLayer(layerName: string): void {
    this.olmap.getLayers().getArray()
      .filter(layer => layer.get('name') === layerName)
      .forEach(layer => this.olmap.removeLayer(layer));
  }

  addMarker(coordinates: [number, number]): void {
    const marker = new Feature({
      geometry: new Point(transform(coordinates, 'EPSG:4326', 'EPSG:3857'))
    });

    marker.setStyle(
      new Style({
        image: new CircleStyle({
          radius: 6,
          fill: new Fill({
            color: '#e76f51',
          }),
          stroke: new Stroke({
            color: '#fff',
            width: 1,
          }),
        }),
      })
    );

    const source = new VectorSource({ features: [marker] });

    this.olmap.addLayer(new VectorLayer({ source, properties: { name: 'geosearch' } }));

  }


  //--------------------------------
  // GPS TRACKING
  //--------------------------------

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
