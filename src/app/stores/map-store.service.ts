import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MapState } from '../interfaces/map-state';

@Injectable({
  providedIn: 'root'
})
export class MapStoreService {

  private _mapstate$ = new BehaviorSubject<MapState>(null);
  mapstate$ = this._mapstate$.asObservable();

  constructor() { }

  updateMapState(prop: keyof MapState, value: boolean) {
    const updated = {
      ...this._mapstate$.value,
      [prop]: value
    };

    this._mapstate$.next(updated);
  }
}