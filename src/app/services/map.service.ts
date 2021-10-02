import { Injectable } from '@angular/core';

import Map from 'ol/Map';
import View from 'ol/View';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Geolocation from 'ol/Geolocation';
import GeoJSON from 'ol/format/GeoJSON';
import Point from 'ol/geom/Point';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';
import { ScaleLine } from 'ol/control';
import Select from 'ol/interaction/Select';
import { transform } from 'ol/proj';
import TileWMS from 'ol/source/TileWMS';
import { register } from 'ol/proj/proj4';
import proj4 from 'proj4';

import { Layer } from '../interfaces/map-layer-source';
import { MapStoreService } from '../stores/map-store.service';
import { MapLayersService } from './map-layers.service';
import { ViewState } from '../interfaces/map-state';


@Injectable({
  providedIn: 'root'
})
export class MapService {

  private viewProjection = 'EPSG:3857';
  private olmap: Map;
  private view: View;
  private geolocation: Geolocation;
  private featureSelection: Select;

  constructor(private mapStoreService: MapStoreService, private mapLayersService: MapLayersService) { }

  createMap(center: [number, number], zoom: number): void {

    this.view = new View({
      center,
      projection: this.viewProjection,
      zoom,
      enableRotation: false
    });

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
      view: this.view,
    });

    this.olmap.on('moveend', () => {
      this.moveend();
    });

    this.olmap.once('postrender', () => {
      this.mapStoreService.updateMapState('mapLoaded', true);
    });

    this.addClickInfo();

  }

  changeBaseMap(layerName: 'aerial' | 'streets' | 'hillshade') {
    const layers = this.olmap.getLayers().getArray();
    this.olmap.removeLayer(layers[0]);
    this.olmap.getLayers().insertAt(0, this.mapLayersService.getBaseMapById(layerName).map);
  }

  flyTo(coordinates: [number, number], zoom = 18): void {
    this.view.animate({
      center: transform(coordinates, 'EPSG:4326', this.viewProjection),
      zoom,
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
          VERSION: '1.1.1',
          TRANSPARENT: 'TRUE',
          FORMAT: 'image/png',
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
      geometry: new Point(transform(coordinates, 'EPSG:4326', this.viewProjection))
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

  addClickInfo(): void {

    this.olmap.on('click', (e) => {
      const features = this.olmap.getFeaturesAtPixel(e.pixel);

      if (features.length === 0) {
        return;
      }

      const feature = features[0].getProperties();

      this.mapStoreService.emitSelectedFeature(feature);

    });

    this.featureSelection = new Select({
      style: new Style({
        image: new CircleStyle({
          radius: 15,
          fill: new Fill({
            color: 'tomato',
          }),
          stroke: new Stroke({
            color: '#fff',
            width: 2,
          }),
        }),
      })
    });
    this.olmap.addInteraction(this.featureSelection);

  }

  clearFeatureSelection() {
    this.olmap.removeInteraction(this.featureSelection);
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
      projection: this.view.getProjection(),
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
      this.view.animate({
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

  setView(view: ViewState) {
    const center = transform(view.center, 'EPSG:4326', this.viewProjection);
    this.view.animate({ ...view, center });
  }

  private moveend() {
    this.getViewParams();
  }

  private getViewParams() {
    const zoom = Math.round(this.view.getZoom() * 100) / 100;
    const center = transform(this.view.getCenter(), this.viewProjection, 'EPSG:4326').map(coor => Math.round(coor * 1000) / 1000);
    const rotation = this.view.getRotation();

    this.mapStoreService.updateMapState('view', { center, zoom, rotation });
  }

  // UTILS
  transform(point: [number, number], source: string = 'EPSG:4326', destination: string = 'EPSG:25832') {
    return transform(point, source, destination);
  }

  addGeoJSON(geojson, projection: string): void {
    const vectorSource = new VectorSource({
      features: new GeoJSON({ featureProjection: projection }).readFeatures(geojson, { featureProjection: 'EPSG:3857' }),
    });


    const vectorLayer = new VectorLayer({
      source: vectorSource,
      properties: { name: 'photos' },
      style: new Style({
        image: new CircleStyle({
          radius: 15,
          fill: new Fill({
            color: '#3399CC',
          }),
          stroke: new Stroke({
            color: '#fff',
            width: 2,
          }),
        }),
      }),
    });

    this.olmap.addLayer(vectorLayer);

  }

  removeProjectOverlays() {
    this.removeLayer('photos');
  }

}
