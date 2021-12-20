import { Component, OnDestroy, OnInit } from '@angular/core';
import { MapService } from '@app/services/map.service';
import { UserNotificationService } from '@app/shared/userNotification.service';
import { MapStoreService } from '@app/stores/map-store.service';
import { Feature } from 'ol';
import { Geometry } from 'ol/geom';
import { BehaviorSubject, Subject } from 'rxjs';
import { filter, map, takeUntil, tap } from 'rxjs/operators';

interface DawaInfo {
  id: string;
  adresse: string;
  kommune: string;
  matrikkel: {
    nummer: string;
    ejerlav: string;
    ejerlavkode: string;
  };
  dinGeo: string;
  ois: string;
}

@Component({
  selector: 'app-map-info-tool',
  templateUrl: './map-info-tool.component.html',
  styleUrls: ['./map-info-tool.component.scss'],
})
export class MapInfoToolComponent implements OnInit, OnDestroy {

  showModal = false;
  adandon$ = new Subject();
  dawaInfo$ = new BehaviorSubject<DawaInfo>(null);
  disableAddressButton$ = this.mapStore.mapstate$.pipe(
    map(mapState => mapState.view?.zoom < 15 ? true : false)
  );

  constructor(
    private mapService: MapService,
    private mapStore: MapStoreService,
    private notification: UserNotificationService
  ) { }

  ngOnInit() {
    this.mapStore.selectedFeature$.pipe(
      takeUntil(this.adandon$),
      filter(feature => !!feature),
      map((feature: Feature<Geometry>) => feature.getProperties()),
      tap(feature => this.dawaInfo$.next(
        {
          id: feature.id,
          adresse: feature.betegnelse,
          kommune: feature.kommunenavn,
          matrikkel: {
            nummer: feature.matrikelnr,
            ejerlav: feature.ejerlavnavn,
            ejerlavkode: feature.ejerlavkode
          },
          dinGeo: `${feature.postnr}-${feature.postnrnavn}/${feature.vejnavn}-${feature.husnr}/`,
          ois: `komnr=${feature.kommunekode}&ejdnr=${feature.esrejendomsnr}`
        }
      )),
      tap(() => this.showModal = !this.showModal)
    ).subscribe(console.log);
  }

  ngOnDestroy(): void {
    this.adandon$.next();
  }

  onShowPOI(): void {
    this.mapService.removeLayer('adresser');
    this.mapService.addAdresserWithinViewExtent();
    this.notification.presentToast({
      message: 'Klik på adresse for info',
      duration: 2000,
      position: 'top',
      color: 'secondary'
    });
  }


}
