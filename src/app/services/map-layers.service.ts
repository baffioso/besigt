import { Injectable } from '@angular/core';
import { MapboxVector } from 'ol/layer';
import TileLayer from 'ol/layer/Tile';
import TileWMS from 'ol/source/TileWMS';
import { BehaviorSubject } from 'rxjs';
import { BaseMap, LayersConfig, MapOverlays } from '../interfaces/map-layer-source';

@Injectable({
  providedIn: 'root'
})
export class MapLayersService {



  // https://miljoegis.mim.dk/fagtekster/grundvand/miljoestyrelsens_udstilling_af_grundvandsdata.pdf

  private _overlays$ = new BehaviorSubject<MapOverlays[]>(
    [
      {
        name: 'Danmarks arealinformation',
        type: 'wms',
        url: 'https://arealinformation.miljoeportal.dk/gis/services/DAIdb/MapServer/WMSServer',
        layers: [
          { name: 'BES_VANDLOEB', label: 'Beskyttede vandløb', addedToMap: false },
          { name: 'BES_NATURTYPER', label: 'Beskyttede naturtyper', addedToMap: false },
          // { name: 'FUGLE_BES_OMR', label: 'Fugle beskyttet område', addedToMap: false },
          // { name: 'HABITAT_OMR', label: 'Habitat område', addedToMap: false },
          // { name: 'RAMSAR_OMR', label: 'RAMSAR_OMR', addedToMap: false },
          // { name: 'NATUR_VILDT_RESERVAT', label: 'Natur vildt reservat', addedToMap: false },
          { name: 'SOE_BES_LINJER', label: 'Søbeskyttelseslinjer', addedToMap: false },
          { name: 'AA_BES_LINJER', label: 'Åbeskyttelseslinjer', addedToMap: false },
          // { name: 'SKOVBYGGELINJER', label: 'Skobbyggelinjer', addedToMap: false },
          // { name: 'KIRKEBYGGELINJER', label: 'Kirkebyggelinger', addedToMap: false },
          { name: 'BES_STEN_JORDDIGER', label: 'Beskyttede sten og jorddiger', addedToMap: false },
          { name: 'FREDEDE_OMR', label: 'Fredede områder', addedToMap: false },
          { name: 'FREDEDE_OMR_FORSLAG', label: 'Fredede områder (forslag)', addedToMap: false },
          // { name: 'OMR_KLASSIFICERING', label: 'Område klassificering', addedToMap: false },
          { name: 'RAASTOFOMR', label: 'Råstofområder', addedToMap: false },
          // { name: 'KYSTNAERHEDSZONE', label: 'Kystnærhedszone', addedToMap: false },
          // { name: 'PAABUD_JFL', label: 'Påbud JFL', addedToMap: false },
          // { name: 'INDSATSPLANER', label: 'Indsatsplaner', addedToMap: false },
          // { name: 'FREDEDE_OMR_BK', label: 'Fredede områder BK', addedToMap: false },
          // { name: 'STATUS_BNBO', label: 'Status BNBO', addedToMap: false },
          // { name: 'AFTAREA_GRVBES', label: 'AFTAREA_GRVBES', addedToMap: false },
          // { name: 'HNV', label: 'HNV', addedToMap: false }
        ]
      },
      {
        name: 'Grundvand',
        type: 'wms',
        url: 'https://miljoegis.mim.dk/wms?servicename=grundvand_wms',
        layers: [
          { name: 'gvkort_drikkevandsinteresser', label: 'Drikkevandsinteresser, vedtaget', addedToMap: false },
          { name: 'gvkort_indvindingsoplande_i_osd', label: 'Indvindingsoplande inden for OSD', addedToMap: false },
          { name: 'gvkort_indvindingsoplande_udenfor_osd', label: 'Indvindingsoplande uden for OSD, vedtaget', addedToMap: false },
          { name: 'gvkort_foelsommeindvindingsomraader', label: 'Følsomme indvindingsområder, vedtaget', addedToMap: false },
          { name: 'gvkort_bnbo', label: 'Boringsnære beskyttelsesområder (BNBO)', addedToMap: false },

        ]
      },
      {
        name: 'Matrikler',
        url: 'https://api.dataforsyningen.dk/MatrikelGaeldendeOgForeloebigWMS_DAF?token=44af18dc4d55df1d85ef32b8961ba0de&TRANSPARENT=TRUE',
        type: 'wms',
        server: 'mapserver',
        layers: [
          { name: 'Jordstykke_Gaeldende', label: 'Matrikler', addedToMap: false, opacity: 0.7 },
          { name: 'OptagetVej_Gaeldende', label: 'Optaget vej', addedToMap: false },
        ]
      }

    ]

  );
  overlays$ = this._overlays$.asObservable();

  private _baseMaps$ = new BehaviorSubject<BaseMap[]>(
    [
      {
        id: 'aerial',
        name: 'Luftfoto',
        selected: true,
        map: new TileLayer({
          source: new TileWMS({
            projection: 'EPSG:25832',
            url: 'https://services.kortforsyningen.dk/orto_foraar?token=44af18dc4d55df1d85ef32b8961ba0de',
            params: {
              layers: 'orto_foraar',
              'VERSION': '1.1.1',
              'TRANSPARENT': 'false',
              'FORMAT': 'image/jpeg',
            }
          })
        })
      },
      {
        id: 'streets',
        name: 'Skærmkort',
        selected: false,
        map: new MapboxVector({
          styleUrl: 'mapbox://styles/mapbox/bright-v9',
          accessToken: 'pk.eyJ1IjoiYmFmZmlvc28iLCJhIjoiY2tyYjFrZDlsMTF6ZzJ6cDhkdDg2bW15cSJ9.afJAXgWRc8yRd50I5WFhAQ'
        }),
      },
      {
        id: 'dtm_shadow',
        name: 'Skyggekort (terræn)',
        selected: true,
        map: new TileLayer({
          source: new TileWMS({
            projection: 'EPSG:25832',
            url: 'https://api.dataforsyningen.dk/dhm_DAF',
            params: {
              layers: 'dhm_terraen_skyggekort',
              token: '44af18dc4d55df1d85ef32b8961ba0de',
              'VERSION': '1.1.1',
              'TRANSPARENT': 'true',
              'FORMAT': 'image/png',
            }
          })
        })
      },
    ]
  );
  baseMaps$ = this._baseMaps$.asObservable();


  updateOverlays(sourceName: string, layerName: string, state: boolean): void {
    const overlaysUpdate = this._overlays$.value
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

    this._overlays$.next(overlaysUpdate);
  }

  updateBaseLayerSelection(id: string) {
    const updated = this._baseMaps$.value.map(baseMap => {
      if (baseMap.id === id) {
        return { ...baseMap, selected: true };
      }
      return { ...baseMap, selected: false };
    });

    this._baseMaps$.next(updated);
  }

  getBaseMapById(id: 'aerial' | 'streets' | 'hillshade'): BaseMap {
    const baseMap = this._baseMaps$.value.find(map => map.id === id);
    return baseMap;
  }
}
