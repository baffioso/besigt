import { Injectable } from '@angular/core';
import { MapLayersService } from './map-layers.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  // mapLayers$ = this.mapLayersService.layers$.pipe(
  //   map(sources => {
  //     sources.map(source)
  //   })
  // )

  constructor(private mapLayersService: MapLayersService) { }

}
