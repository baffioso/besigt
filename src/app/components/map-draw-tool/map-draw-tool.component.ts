import { Component } from '@angular/core';
import { MapService } from '@app/services/map.service';

@Component({
  selector: 'app-map-draw-tool',
  templateUrl: './map-draw-tool.component.html',
  styleUrls: ['./map-draw-tool.component.scss'],
})
export class MapDrawToolComponent {
  inEditMode = false;
  drawGeometry: 'Point' | 'LineString' | 'Polygon';

  constructor(
    private mapService: MapService,
  ) { }

  onStartDraw(geometryType: 'Point' | 'LineString' | 'Polygon'): void {
    this.drawGeometry = geometryType;
    this.mapService.removeDrawTool();
    this.mapService.addDrawTool(geometryType);

    this.inEditMode = true;
  }

  undo(): void {
    this.mapService.removeLastDrawPoint();
  }

  toggleEditMode(): void {
    this.inEditMode = false;
  }

}
