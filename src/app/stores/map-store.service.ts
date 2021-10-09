import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { BehaviorSubject, from, of, Subject } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { MapState } from '../interfaces/map-state';
import { SupabaseService } from '../services/supabase.service';

@Injectable({
  providedIn: 'root'
})
export class MapStoreService {

  private _drawnGeometry$ = new BehaviorSubject<string>(null);
  drawnGeometry$ = this._drawnGeometry$.asObservable();

  private _mapstate$ = new BehaviorSubject<MapState>({ mapLoaded: false, loadingFeatureInfo: false });
  mapstate$ = this._mapstate$.asObservable();

  private _selectedFeature$ = new Subject();
  selectedFeature$ = this._selectedFeature$.asObservable().pipe(
    // Fetch image from backend and convert to vebview URL
    // eslint-disable-next-line arrow-body-style
    mergeMap((feature: any) => {
      if (feature.file_name) {
        return from(this.supabase.downloadImage(feature.file_name?.replace('images/', ''))).pipe(
          map(image => {
            const webView = this.domSanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(image.data));
            return { ...feature, webView };
          })
        );
      } else {
        return of(null);
      }
    }
    )
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

  emitSelectedFeature(feature) {
    this._selectedFeature$.next(feature);
  }

  emitDrawnGeometry(wktGeom: string) {
    this._drawnGeometry$.next(wktGeom);
  }
}
