import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReverseGeocodeResponse } from '@app/interfaces/dawa';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DawaService {
  baseUrl = environment.dawaBaseUrl;

  constructor(private http: HttpClient) { }

  reverseGeocode(x: number, y: number): Observable<ReverseGeocodeResponse> {
    const url = `${this.baseUrl}/adgangsadresser/reverse?x=${x}&y=${y}`;
    return this.http.get<any>(url).pipe(
      map(res => (
        {
          id: res.id,
          vejnavn: res.vejstykke.navn,
          husnr: res.husnr,
          adressebetegnelse: res.adressebetegnelse,
          koordinater: res.adgangspunkt.koordinater,
          matrikelnr: res.matrikelnr,
          ejerlav: res.ejerlav
        }
      ))
    );
  }

  fetchMatriklerWithinPolygon(polygon: number[][][]) {
    const p = JSON.stringify(polygon);
    const url = `${this.baseUrl}/jordstykker?format=geojson&polygon=${p}`;
    return this.http.get(url);
  }

  fetchAdresserWithinPolygon(polygon: number[][][]) {
    const p = JSON.stringify(polygon);
    const url = `${this.baseUrl}/adgangsadresser?format=geojson&polygon=${p}`;
    return this.http.get(url);
  }
}
