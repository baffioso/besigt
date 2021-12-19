import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class DawaService {


  constructor(private http: HttpClient) { }

  fetchMatriklerWithinPolygon(polygon) {
    const p = JSON.stringify(polygon);
    const url = `${environment.dawaBaseUrl}/jordstykker?format=geojson&polygon=${p}`;
    return this.http.get(url);
  }
}
