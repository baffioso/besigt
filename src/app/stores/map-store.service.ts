import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Feature } from 'ol';
import { WKT } from 'ol/format';
import { Geometry } from 'ol/geom';
import RenderFeature from 'ol/render/Feature';
import { BehaviorSubject, of, Subject } from 'rxjs';
import { filter, map, mergeMap, share, shareReplay, tap } from 'rxjs/operators';
import { MapState } from '../interfaces/map-state';
import { SupabaseService } from '../services/supabase.service';

@Injectable({
  providedIn: 'root'
})
export class MapStoreService {

  private _drawnGeometry$ = new BehaviorSubject<string>(null);
  drawnGeometry$ = this._drawnGeometry$.asObservable();

  private _mapstate$ = new BehaviorSubject<MapState>({ mapLoaded: false, loadingFeatureInfo: false, loadingLayer: false });
  mapstate$ = this._mapstate$.asObservable();

  private _selectedFeature$ = new BehaviorSubject<RenderFeature | Feature<Geometry>>(null);
  selectedFeature$ = this._selectedFeature$.asObservable();

  selectedImage$ = this.selectedFeature$.pipe(
    filter(feat => !!feat),
    // Fetch image from backend and convert to vebview URL
    // eslint-disable-next-line arrow-body-style
    mergeMap((feature: Feature<Geometry>) => {

      const fileName = feature.getProperties().file_name;

      if (fileName) {
        return this.supabase.downloadImage(fileName.replace('images/', '')).pipe(
          map(image => {
            const webView = this.domSanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(image.data));
            return { ...feature, webView };
          })
        );
      } else {
        return of(null);
      }
    })
  );

  selectedFeatureAsWKT$ = this.selectedFeature$.pipe(
    map(feature => {
      const wkt = new WKT();
      return wkt.writeFeature(feature as Feature<Geometry>, {
        featureProjection: 'EPSG:3857',
        dataProjection: 'EPSG:25832'
      });

    })
  );

  get viewState() {
    return this._mapstate$.value.view;
  }

  constructor(
    private supabase: SupabaseService,
    private readonly domSanitizer: DomSanitizer,

  ) { }

  updateMapState(prop: keyof MapState, value: any) {
    const updated = {
      ...this._mapstate$.value,
      [prop]: value
    };

    this._mapstate$.next(updated);
  }

  emitSelectedFeature(feature: RenderFeature | Feature<Geometry>) {
    this._selectedFeature$.next(feature);
  }

  emitDrawnGeometry(wktGeom: string) {
    this._drawnGeometry$.next(wktGeom);
  }
}
