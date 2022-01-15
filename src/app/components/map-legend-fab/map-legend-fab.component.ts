import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { map } from 'rxjs/operators';
import { MapLayersService } from 'src/app/services/map-layers.service';
import { MapLegendPopoverComponent } from '../map-legend-popover/map-legend-popover.component';

@Component({
  selector: 'app-map-legend-fab',
  templateUrl: './map-legend-fab.component.html',
  styleUrls: ['./map-legend-fab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapLegendFabComponent {

  showLegend$ = this.mapLayersService.legends$.pipe(
    map(legends => legends.length === 0 ? false : true)
  );

  constructor(
    public popoverController: PopoverController,
    private mapLayersService: MapLayersService
  ) { }

  async onShowPopover(event: any) {
    const popover = await this.popoverController.create({
      component: MapLegendPopoverComponent,
      cssClass: 'legend-popover',
      translucent: true,
      showBackdrop: false,
      animated: false,
      event
    });
    await popover.present();

  }

}
