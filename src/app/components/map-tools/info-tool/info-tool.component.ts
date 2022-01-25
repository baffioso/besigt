import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { MapService } from '@app/services/map.service';
import { UserNotificationService } from '@app/shared/userNotification.service';
import { AppState } from '@app/store/app.reducer';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

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
  selector: 'app-info-tool',
  templateUrl: './info-tool.component.html',
  styleUrls: ['./info-tool.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InfoToolComponent implements OnDestroy {

  showModal = false;
  adandon$ = new Subject();
  dawaInfo$ = new BehaviorSubject<DawaInfo>(null);
  disableAddressButton$ = this.store.select('map', 'viewParams').pipe(
    map(view => view?.zoom < 15 ? true : false)
  );

  constructor(
    private mapService: MapService,
    private notification: UserNotificationService,
    private store: Store<AppState>
  ) { }

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

  ngOnDestroy(): void {
    this.mapService.removeLayer('adresser')
  }

}
