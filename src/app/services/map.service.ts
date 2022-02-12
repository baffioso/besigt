import { Injectable } from '@angular/core';
import { finalize, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as mapActions from '@app/state/map.actions';
import copy from 'fast-copy';

import Map from 'ol/Map';
import View from 'ol/View';
import { MapBrowserEvent } from 'ol';
import { Tile as TileLayer, Vector as VectorLayer, Layer as OlLayer } from 'ol/layer';
import VectorSource from 'ol/source/Vector';
import { unByKey } from 'ol/Observable';
import Feature from 'ol/Feature';
import Geolocation from 'ol/Geolocation';
import { Draw, Modify } from 'ol/interaction';
import { GeoJSON, WKT } from 'ol/format';
import { LineString, Polygon, Point, Geometry } from 'ol/geom';
import { fromExtent } from 'ol/geom/Polygon';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';
import { ScaleLine } from 'ol/control';
import { transform } from 'ol/proj';
import TileWMS from 'ol/source/TileWMS';
import { getArea, getLength } from 'ol/sphere';
import { register } from 'ol/proj/proj4';
import proj4 from 'proj4';

import { ViewState } from '../interfaces/map-state';
import { MapStoreService } from '../stores/map-store.service';
import { MapLayersService } from './map-layers.service';
import { DawaService } from './dawa.service';
import { Layer } from '../interfaces/map-layer-source';
import { mapStyles } from '@app/shared/mapStyles';
import { AppState } from '@app/store/app.reducer';
import { EventsKey } from 'ol/events';
import { LayerName } from '@app/interfaces/layerNames';
import RenderFeature from 'ol/render/Feature';

proj4.defs('EPSG:25832', '+proj=utm +zone=32 +ellps=GRS80 +units=m +no_defs');
register(proj4);

export type Projection = 'EPSG:3857' | 'EPSG:4326' | 'EPSG:25832'

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private viewProjection = 'EPSG:3857';
  private olmap: Map;
  private view: View;
  private geolocation: Geolocation;
  private draw: Draw;
  private sketch: any;
  private clickEventKey: EventsKey;
  private highlightLayerNames: LayerName[] = [
    'adresser',
    'jordstykke',
    'projectPhotos',
    'projectFeatures'
  ]


  constructor(
    private mapStoreService: MapStoreService,
    private mapLayersService: MapLayersService,
    private dawaService: DawaService,
    private store: Store<AppState>
  ) { }

  createMap(center: [number, number], zoom: number): void {

    this.view = new View({
      center,
      projection: this.viewProjection,
      zoom,
      enableRotation: false
    });

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
      this.store.dispatch(mapActions.mapLoaded());
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

  addWMSLayer(url: string, layer: Layer): void {

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

  getLayer(layerName: string) {
    return this.olmap.getLayers().getArray()
      .find(layer => layer.get('name') === layerName);
  }

  removeLayer(layerName: string): void {
    this.olmap.getLayers().getArray()
      .filter(layer => layer.get('name') === layerName || layer.get(`${layerName}_highlight`) === `${layerName}_highlight`)
      .forEach(layer => this.olmap.removeLayer(layer));
  }

  changeLayerStyle(layerName: string, style: Style | Style[]) {
    const layer = this.getLayer(layerName) as any;
    layer.setStyle(style);
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

    this.olmap.addLayer(new VectorLayer({ source, properties: { name: 'marker' } }));

  }


  private handelClickInfo(evt: MapBrowserEvent<any>) {

    this.clearFeatureSelection();

    let features: { feature: RenderFeature | Feature<Geometry>, layerName: LayerName }[] = [];

    this.olmap.forEachFeatureAtPixel(evt.pixel,
      (feature, layer) => {
        const layerName = layer.get('layerName')

        features.push({ feature: feature, layerName })

        const selectedId = feature.getId()

        const highLightLayer = this.olmap.getLayers().getArray().find(l => {
          return l.get('layerName')?.includes(`${layerName}_highlight`)
        }) as VectorLayer<any>;

        if (highLightLayer) {

          highLightLayer.setStyle(f => f.getId() === selectedId ?
            mapStyles.selection :
            null
          );
        }

      },
      {
        hitTolerance: 10,
        layerFilter: (layer) => {
          return this.highlightLayerNames.includes(layer.get('layerName'))
        }
      }
    );

    features.length === 0 ?
      this.store.dispatch(mapActions.selectedFeatures(null)) :
      this.store.dispatch(mapActions.selectedFeatures({ features }))

  }

  addClickInfo(): void {
    this.clickEventKey = this.olmap.on('click', evt => this.handelClickInfo(evt));
  }

  removeClickInfo() {
    unByKey(this.clickEventKey);
  }

  clearFeatureSelection() {
    this.olmap.getLayers().getArray()
      .filter(layer => layer.get('layerName')?.includes('_highlight'))
      .forEach((layer: VectorLayer<any>) => layer.setStyle(null));
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

  activateDrawTool(geometryType: 'Point' | 'LineString' | 'Polygon'): void {

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

    this.draw.on('drawend', (e) => {
      // NGRX needs deep clone of feature https://stackoverflow.com/a/60885787
      const feature = copy(e.feature);;
      this.store.dispatch(mapActions.drawnFeature({ feature }));
    });
  }

  finishDrawing() {
    this.draw.finishDrawing();
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
    const center = transform(this.view.getCenter(), this.viewProjection, 'EPSG:4326') as [number, number];
    const rotation = this.view.getRotation();
    const extent = this.view.calculateExtent(); // in EPSG:3857

    this.store.dispatch(mapActions.updateViewParams({ viewParams: { center, zoom, rotation, extent } }))
    this.mapStoreService.updateMapState('view', { center, zoom, rotation, extent });
  }

  // UTILS
  transform(geometry: [number, number], source: string = 'EPSG:4326', destination: string = 'EPSG:25832') {
    return transform(geometry, source, destination);
  }

  featureAsWKT(feature: Feature<Geometry>, sourceSrid: string = 'EPSG:3857', targetSrid: string = 'EPSG:25832'): string {
    const wkt = new WKT();

    return wkt.writeFeature(feature, {
      featureProjection: sourceSrid,
      dataProjection: targetSrid
    });
  }

  // eslint-disable-next-line max-len
  addGeoJSON(
    geojson: any,
    layerName: LayerName,
    sourceSrid: string,
    style: Style | Style[] = mapStyles.default,
    addHighlightLayer = false
  ): void {
    let features: Feature<any>[];

    if (geojson.type === 'FeatureCollection') {
      features = new GeoJSON({ featureProjection: sourceSrid }).readFeatures(geojson, { featureProjection: this.viewProjection });
    } else {
      features = [new GeoJSON({ featureProjection: sourceSrid }).readFeature(geojson, { featureProjection: this.viewProjection })];
    }

    const vectorSource = new VectorSource({
      features
    });

    const vectorLayer = new VectorLayer({
      source: vectorSource,
      properties: { layerName },
      style
    });

    this.olmap.addLayer(vectorLayer);

    if (addHighlightLayer) {

      const highlightLayer = new VectorLayer({
        source: vectorSource,
        properties: { layerName: `${layerName}_highlight` },
        style: null
      })

      this.olmap.addLayer(highlightLayer);
    }
  }

  removeProjectOverlays() {
    ['projectArea', 'projectPhotos', 'projectFeatures'].forEach(layer => {
      this.removeLayer(layer)
    })
  }

  getViewExtent(): Feature<Geometry> {
    const extent = this.olmap.getView().calculateExtent(this.olmap.getSize());
    const polygon = fromExtent(extent).transform('EPSG:3857', 'EPSG:4326') as Polygon;
    return new Feature({
      geometry: polygon
    });
  }

  addMatrikelWithinViewExtent() {
    const extentPolygon = this.getViewExtent() as Feature<Polygon>;
    const extentArray = extentPolygon.getGeometry().getCoordinates();
    this.mapStoreService.updateMapState('loadingLayer', true);

    this.dawaService.fetchMatriklerWithinPolygon(extentArray).pipe(
      tap(geojson => this.addGeoJSON(geojson, 'jordstykke', 'EPSG:4326', mapStyles.default, true)),
      tap(() => this.mapStoreService.updateMapState('loadingLayer', false)),
      finalize(() => this.mapStoreService.updateMapState('loadingLayer', false))
    ).subscribe();

  }

  addAdresserWithinViewExtent() {
    const extentPolygon = this.getViewExtent() as Feature<Polygon>;
    const extentArray = extentPolygon.getGeometry().getCoordinates();
    this.mapStoreService.updateMapState('loadingLayer', true);

    this.dawaService.fetchAdresserWithinPolygon(extentArray).pipe(
      tap(geojson => this.addGeoJSON(geojson, 'adresser', 'EPSG:4326', mapStyles.addressInfo, true)),
      finalize(() => this.mapStoreService.updateMapState('loadingLayer', false))
    ).subscribe();

  }

}
