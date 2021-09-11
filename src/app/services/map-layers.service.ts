import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MapLayerSource } from '../interfaces/map-layer-source';

@Injectable({
  providedIn: 'root'
})
export class MapLayersService {

  // https://miljoegis.mim.dk/fagtekster/grundvand/miljoestyrelsens_udstilling_af_grundvandsdata.pdf

  private _layers$ = new BehaviorSubject<MapLayerSource[]>([
    {
      name: 'Danmarks arealinformation',
      type: 'wms',
      url: 'https://arealinformation.miljoeportal.dk/gis/services/DAIdb/MapServer/WMSServer',
      layers: [
        { name: 'BES_VANDLOEB', label: 'Beskyttede vandløb', addedToMap: false },
        { name: 'BES_NATURTYPER', label: 'Beskyttede naturtyper', addedToMap: false },
        { name: 'FUGLE_BES_OMR', label: 'Fugle beskyttet område', addedToMap: false },
        { name: 'HABITAT_OMR', label: 'Habitat område', addedToMap: false },
        { name: 'RAMSAR_OMR', label: 'RAMSAR_OMR', addedToMap: false },
        { name: 'NATUR_VILDT_RESERVAT', label: 'Natur vildt reservat', addedToMap: false },
        { name: 'SOE_BES_LINJER', label: 'Søbeskyttelseslinjer', addedToMap: false },
        { name: 'AA_BES_LINJER', label: 'Åbeskyttelseslinjer', addedToMap: false },
        { name: 'SKOVBYGGELINJER', label: 'Skobbyggelinjer', addedToMap: false },
        { name: 'KIRKEBYGGELINJER', label: 'Kirkebyggelinger', addedToMap: false },
        { name: 'BES_STEN_JORDDIGER', label: 'Beskyttede sten og jorddiger', addedToMap: false },
        { name: 'FREDEDE_OMR', label: 'Fredede områder', addedToMap: false },
        { name: 'FREDEDE_OMR_FORSLAG', label: 'Fredede områder (forslag)', addedToMap: false },
        { name: 'OMR_KLASSIFICERING', label: 'Område klassificering', addedToMap: false },
        { name: 'RAASTOFOMR', label: 'Råstofområder', addedToMap: false },
        { name: 'KYSTNAERHEDSZONE', label: 'Kystnærhedszone', addedToMap: false },
        { name: 'PAABUD_JFL', label: 'Påbud JFL', addedToMap: false },
        { name: 'INDSATSPLANER', label: 'Indsatsplaner', addedToMap: false },
        { name: 'FREDEDE_OMR_BK', label: 'Fredede områder BK', addedToMap: false },
        { name: 'STATUS_BNBO', label: 'Status BNBO', addedToMap: false },
        { name: 'AFTAREA_GRVBES', label: 'AFTAREA_GRVBES', addedToMap: false },
        { name: 'HNV', label: 'HNV', addedToMap: false }
      ]
    },
    // {
    //   name: 'Vand',
    //   url: 'http://tilecache3-miljoegis.mim.dk/gwc/service/wmts?REQUEST=getcapabilities'
    // }

  ]);
  layers$ = this._layers$.asObservable();


  changeAddedToMapState(sourceName: string, layerName: string, state: boolean): void {
    const update = this._layers$.value
      .map(source => {
        if (source.name === sourceName) {
          const layers = source.layers.map(layer => {
            if (layer.name === layerName) {
              return {
                ...layer,
                addedToMap: state
              };
            }
            return layer;
          });

          return { ...source, layers };
        }
        return source;
      });

    this._layers$.next(update);

  }

}
