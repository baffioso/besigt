import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MapLayersService } from 'src/app/services/map-layers.service';

@Component({
  selector: 'app-map-legend-popover',
  templateUrl: './map-legend-popover.component.html',
  styleUrls: ['./map-legend-popover.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapLegendPopoverComponent {

  legends$ = this.mapLayersService.legends$;

  constructor(private mapLayersService: MapLayersService) { }


}
