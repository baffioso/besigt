/* eslint-disable quote-props */
import { Injectable } from '@angular/core';
import { MapboxVector } from 'ol/layer';
import TileLayer from 'ol/layer/Tile';
import TileWMS from 'ol/source/TileWMS';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseMap, MapOverlay } from '../interfaces/map-layer-source';

@Injectable({
  providedIn: 'root'
})
export class MapLayersService {



  // https://miljoegis.mim.dk/fagtekster/grundvand/miljoestyrelsens_udstilling_af_grundvandsdata.pdf

  private _overlays$ = new BehaviorSubject<MapOverlay[]>(
    [
      {
        name: 'Danmarks arealinformation',
        icon: 'leaf-outline',
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
        icon: 'water-outline',
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
        icon: 'home-outline',
        url: 'https://api.dataforsyningen.dk/MatrikelGaeldendeOgForeloebigWMS_DAF?token=44af18dc4d55df1d85ef32b8961ba0de&TRANSPARENT=TRUE',
        type: 'wms',
        server: 'mapserver',
        layers: [
          { name: 'Jordstykke_Gaeldende', label: 'Matrikler', addedToMap: false, opacity: 0.7 },
          { name: 'OptagetVej_Gaeldende', label: 'Optaget vej', addedToMap: false },
        ]
      },
      {
        name: 'Højdemodel',
        icon: 'stats-chart-outline',
        url: 'https://api.dataforsyningen.dk/dhm_DAF?token=44af18dc4d55df1d85ef32b8961ba0de&TRANSPARENT=TRUE',
        type: 'wms',
        server: 'mapserver',
        layers: [
          { name: 'dhm_kurve_0_25_m', label: 'Højdekurver 0,25m', addedToMap: false, minZoom: 17.40 },
          { name: 'dhm_kurve_0_5_m', label: 'Højdekurver 0,5m', addedToMap: false, minZoom: 17.40 }
        ]
      },
      {
        name: 'Nedbør',
        icon: 'rainy-outline',
        url: 'https://api.dataforsyningen.dk/dhm?token=44af18dc4d55df1d85ef32b8961ba0de',
        type: 'wms',
        server: 'mapserver',
        layers: [
          { name: 'dhm_bluespot_ekstremregn', label: 'Bluespot', addedToMap: false },
          { name: 'dhm_flow_ekstremregn', label: 'Flow', addedToMap: false },
          // { name: 'dhm_kurve_0_5_m', label: 'Højdekurver 0,5m', addedToMap: false, minZoom: 17.40 }
        ]
      },
      {
        name: 'Støj',
        icon: 'ear-outline',
        url: 'https://tilecache2-miljoegis.mim.dk/gwc/service/wms?SERVICENAME=noise&ID=theme-pg-noisedataarea-b1&FORMAT=image%2Fpng&LAYERS=theme-pg-noisedataarea-b1&TRANSPARENT=TRUE&SERVICE=WMS&REQUEST=GetMap&STYLES=&SRS=EPSG%3A25832',
        type: 'wms',
        server: 'geoserver',
        layers: [
          { name: 'theme-pg-noisedataarea-g1', label: 'Trafikstøj', addedToMap: false },
          // { name: 'dhm_kurve_0_5_m', label: 'Højdekurver 0,5m', addedToMap: false, minZoom: 17.40 }
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
        image: 'assets/images/aerial.jpeg',
        // image: 'https://api.dataforsyningen.dk/orto_foraar_DAF?token=4609b9f50c1f4123967ee0effd8e0a80&SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&FORMAT=image%2Fjpeg&TRANSPARENT=false&layers=orto_foraar&WIDTH=256&HEIGHT=256&SRS=EPSG%3A25832&STYLES=&BBOX=725644.2845775224%2C6176527.7825319%2C728087.5313269417%2C6178971.02928132',
        map: new TileLayer({
          source: new TileWMS({
            projection: 'EPSG:25832',
            url: 'https://api.dataforsyningen.dk/orto_foraar_DAF?token=4609b9f50c1f4123967ee0effd8e0a80',
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
        image: 'assets/images/streets.png',
        map: new MapboxVector({
          styleUrl: 'mapbox://styles/mapbox/bright-v9',
          accessToken: 'pk.eyJ1IjoiYmFmZmlvc28iLCJhIjoiY2tyYjFrZDlsMTF6ZzJ6cDhkdDg2bW15cSJ9.afJAXgWRc8yRd50I5WFhAQ'
        }),
      },
      {
        id: 'hillshade',
        name: 'Skyggekort (terræn)',
        image: 'assets/images/hillshade.png',
        // image: 'https://api.dataforsyningen.dk/dhm_DAF?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&FORMAT=image%2Fpng&TRANSPARENT=true&layers=dhm_terraen_skyggekort&token=44af18dc4d55df1d85ef32b8961ba0de&WIDTH=256&HEIGHT=256&SRS=EPSG%3A25832&STYLES=&BBOX=725644.2845775224%2C6176527.7825319%2C728087.5313269417%2C6178971.02928132',
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

  legends$: Observable<string[]> = this.overlays$.pipe(
    // eslint-disable-next-line arrow-body-style
    map((sources: MapOverlay[]) => {
      const layers = [];
      // eslint-disable-next-line arrow-body-style
      sources.forEach(source => {
        source.layers.filter(layer => layer.addedToMap)
          .forEach(layer => layers.push(this.getLegendUrl(source.url, layer.name)));
      });

      return layers;
    }),
  );


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

  getBaseMapById(id: 'aerial' | 'streets' | 'hillshade'): BaseMap {
    const baseMap = this._baseMaps$.value.find(basemap => basemap.id === id);
    return baseMap;
  }

  getLegendUrl(url: string, layerName: string): any {
    return `${url}?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=10&HEIGHT=10&LAYER=${layerName}`;
  }

}
