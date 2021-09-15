import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { pluck, tap } from 'rxjs/operators';
import { ViewState } from 'src/app/interfaces/map-state';
import { MapService } from 'src/app/services/map.service';
import { MapStoreService } from 'src/app/stores/map-store.service';

@Component({
  selector: 'app-tap-map',
  templateUrl: 'map.page.html',
  styleUrls: ['map.page.scss']
})
export class TapMapPage implements OnInit {

  constructor(private mapState: MapStoreService, private rounter: Router, private route: ActivatedRoute, private mapSerice: MapService) { }

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      const center = params.center?.map((i) => Number(i));
      const zoom = Number(params.zoom);
      const rotation = Number(params.rotation);

      // if (center) {
      //   this.mapSerice.setView({ center, zoom, rotation });
      // }
      // console.log(center, zoom, rotation);
    });

    this.rounter.navigate([], {
      relativeTo: this.route,
      queryParams: { hello: 'world' },
      queryParamsHandling: 'merge',
    });

    this.mapState.mapstate$.pipe(
      pluck('view'),
      tap(view => {
        this.rounter.navigate([], {
          relativeTo: this.route,
          queryParams: view //{ ...view, center: `${view.center[0]}, ${view.center[1]}` },
          // queryParamsHandling: 'merge',
        });
      })
    ).subscribe();
  }

  addMapViewStateToUrl(queryParams: ViewState) {
    // console.log(queryParams);
    // this.rounter.navigate([], {
    //   relativeTo: this.activatedRoute,
    //   queryParams: { hello: 'world' },
    //   queryParamsHandling: 'merge',
    // });
  }

}
