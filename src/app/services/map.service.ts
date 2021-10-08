import { Injectable } from '@angular/core';

import Map from 'ol/Map';
import View from 'ol/View';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Geolocation from 'ol/Geolocation';
import { Draw, Modify } from 'ol/interaction';
import { GeoJSON, WKT } from 'ol/format';
import { LineString, Polygon, Point } from 'ol/geom';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';
import { ScaleLine } from 'ol/control';
import Select from 'ol/interaction/Select';
import { transform } from 'ol/proj';
import TileWMS from 'ol/source/TileWMS';
import { getArea, getLength } from 'ol/sphere';
import { register } from 'ol/proj/proj4';
import proj4 from 'proj4';

import { Layer } from '../interfaces/map-layer-source';
import { MapStoreService } from '../stores/map-store.service';
import { MapLayersService } from './map-layers.service';
import { ViewState } from '../interfaces/map-state';
import { Coordinate } from 'ol/coordinate';


@Injectable({
  providedIn: 'root'
})
export class MapService {

  private viewProjection = 'EPSG:3857';
  private olmap: Map;
  private view: View;
  private geolocation: Geolocation;
  private featureSelection: Select;
  private draw: Draw;
  private sketch: any;

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

    // this.addClickInfo();
    // this.addMeasureTool('Polygon');

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

    const hitTolerance = 10;

    this.olmap.on('click', (e) => {

      const features = this.olmap.getFeaturesAtPixel(e.pixel, {
        hitTolerance
      });

      if (features.length === 0) {
        return;
      }

      this.mapStoreService.updateMapState('loadingFeatureInfo', true);

      const feature = features[0].getProperties();

      this.mapStoreService.emitSelectedFeature(feature);

    });

    this.featureSelection = new Select({
      hitTolerance,
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
    this.olmap.addInteraction(this.featureSelection);
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

  //--------------------------------
  // DRAW TOOL
  //--------------------------------

  addDrawTool(geometryType: 'Point' | 'LineString' | 'Polygon'): void {

    const drawSource = new VectorSource({ wrapX: false });

    const drawLayer = new VectorLayer({
      source: drawSource,
      properties: { name: 'draw' }
    });

    this.olmap.addLayer(drawLayer);

    const modify = new Modify({ source: drawSource });
    this.olmap.addInteraction(modify);

    this.draw = new Draw({
      source: drawSource,
      type: geometryType
    });

    this.olmap.addInteraction(this.draw);

    const wkt = new WKT();

    this.draw.on('drawend', (e) => {
      const wktGeom = wkt.writeFeature(e.feature, {
        featureProjection: 'EPSG:3857',
        dataProjection: 'EPSG:25832'
      });
      this.mapStoreService.emitDrawnGeometry(wktGeom);
    });
  }

  removeLastDrawPoint(): void {
    this.draw.removeLastPoint();
  }

  removeDrawTool(): void {
    this.olmap.removeInteraction(this.draw);
    this.removeLayer('draw');
  }

  //--------------------------------
  // MEASURE TOOL
  //--------------------------------

  private formatLength(line: LineString) {
    const length = getLength(line);
    let output;
    if (length > 100) {
      output = Math.round((length / 1000) * 100) / 100 + ' ' + 'km';
    } else {
      output = Math.round(length * 100) / 100 + ' ' + 'm';
    }
    return output;
  };

  private formatArea(polygon: Polygon) {
    const area = getArea(polygon);
    let output;
    if (area > 10000) {
      output = Math.round((area / 1000000) * 100) / 100 + ' ' + 'km<sup>2</sup>';
    } else {
      output = Math.round(area * 100) / 100 + ' ' + 'm<sup>2</sup>';
    }
    return output;
  };

  addMeasureTool(type: 'Polygon' | 'LineString') {


    this.draw = new Draw({
      source: new VectorSource(),
      type,
      style: new Style({
        fill: new Fill({
          color: 'rgba(255, 97, 0, 0.2)',
        }),
        stroke: new Stroke({
          color: 'rgba(255, 97, 0, 0.5)',
          lineDash: [10, 10],
          width: 2,
        }),
        image: new CircleStyle({
          radius: 5,
          stroke: new Stroke({
            color: 'rgba(255, 97, 0, 0.7)',
          }),
          fill: new Fill({
            color: 'rgba(255, 97, 0, 0.2)',
          }),
        }),
      }),
    });

    this.olmap.addInteraction(this.draw);

    // createMeasureTooltip();
    // createHelpTooltip();

    this.draw.on('drawstart', (evt) => {
      // set sketch
      this.sketch = evt.feature;

      // /** @type {import("../src/ol/coordinate.js").Coordinate|undefined} */
      // let tooltipCoord: Coordinate = evt.coordinate;

      this.sketch.getGeometry().on('change', (ev) => {
        const geom = ev.target;
        let output;
        if (geom instanceof Polygon) {
          output = this.formatArea(geom);
          // tooltipCoord = geom.getInteriorPoint().getCoordinates();
        } else if (geom instanceof LineString) {
          output = this.formatLength(geom);
          // tooltipCoord = geom.getLastCoordinate();
        }
        // measureTooltipElement.innerHTML = output;
        // measureTooltip.setPosition(tooltipCoord);
      });
    });

    this.draw.on('drawend', () => {
      // measureTooltipElement.className = 'ol-tooltip ol-tooltip-static';
      // measureTooltip.setOffset([0, -7]);
      // unset sketch
      //this.sketch = null;
      // unset tooltip so that a new one can be created
      // measureTooltipElement = null;
      // createMeasureTooltip();
      // unByKey(listener);
    });

    this.olmap.addInteraction(this.draw);
  }



  //--------------------------------
  // UTILS
  //--------------------------------

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
    const extent = this.view.calculateExtent();

    this.mapStoreService.updateMapState('view', { center, zoom, rotation, extent });
  }

  // UTILS
  transform(geometry: number[], source: string = 'EPSG:4326', destination: string = 'EPSG:25832') {
    return transform(geometry, source, destination);
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
