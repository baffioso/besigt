import { Injectable } from '@angular/core';
import { Geolocation, Position, PositionOptions } from '@capacitor/geolocation';
import { BehaviorSubject, from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {
  private _trackingPositions$ = new BehaviorSubject<Position[]>([]);
  trackingPositions$ = this._trackingPositions$.asObservable();
  trackinkIds: string[] = [];

  private positionOptions: PositionOptions = {
    enableHighAccuracy: true,
    timeout: 60000,
    maximumAge: 10000
  };

  constructor() { }

  getPosition(): Observable<Position> {
    return from(
      Geolocation.getCurrentPosition(
        this.positionOptions
      )
    );
  }

  async startTracking() {
    const id = await Geolocation.watchPosition(
      this.positionOptions,
      (position, err) => {
        this._trackingPositions$.next([...this._trackingPositions$.value, position]);
      });

    this.trackinkIds.push(id);
  }

  stopTracking() {
    this.trackinkIds.forEach(id => {
      Geolocation.clearWatch({
        id
      });
    });
  }

  clearTackingPosistions() {
    this._trackingPositions$.next([]);
  }
}
