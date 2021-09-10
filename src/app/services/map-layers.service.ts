import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapLayersService {

  mapLayers = of(
    [
      'Beskyttede Naturtyper',
      'Fredeninger',
      'Matrikler',
      'Fredskov',
      'Beskyttelses zoner',
      'Bevaringsværdi',
      'BBR',
      'Natura 2000',
      'Gas ledning'
    ]
  );

  constructor() { }
}
