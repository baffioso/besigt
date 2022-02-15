import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import * as dawa from 'dawa-autocomplete2';

import { MapService } from '@app/services/map.service';
import { Store } from '@ngrx/store';
import { AppState } from '@app/store/app.reducer';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-geo-search',
  templateUrl: './geo-search.component.html',
  styleUrls: ['./geo-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeoSearchComponent implements AfterViewInit, OnDestroy {
  @ViewChild('input') input: ElementRef;
  showModal$ = this.store.select('mapTools', 'activatedMapTools').pipe(
    map(tools => tools.includes('geoSearch'))
  );
  autocomplete: any;


  constructor(
    private mapService: MapService,
    private store: Store<AppState>
  ) { }

  ngAfterViewInit(): void {
    this.autocomplete = dawa.dawaAutocomplete(this.input.nativeElement, {
      select: (res: any) => {
        const coords: [number, number] = [res.data.x, res.data.y];
        this.mapService.removeLayer('marker');
        this.mapService.addMarker(coords);
        this.mapService.flyTo(coords);
      },
      adgangsadresserOnly: true
    });

    setTimeout(() => { // this will make the execution after the above boolean has changed
      this.input.nativeElement.focus();
    }, 500);
  }

  ngOnDestroy(): void {
    this.autocomplete.destroy();
    console.log('DESTROY SEARCH')
  }
}
