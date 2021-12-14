import { Component, OnInit } from '@angular/core';
import { MapService } from '@app/services/map.service';
import { UiStateService } from '@app/stores/ui-state.service';

@Component({
  selector: 'app-map-draw-tool',
  templateUrl: './map-draw-tool.component.html',
  styleUrls: ['./map-draw-tool.component.scss'],
})
export class MapDrawToolComponent implements OnInit {
  inEditMode = false;
  activatedEditTool: 'modify';
  drawGeometry: 'Point' | 'LineString' | 'Polygon';

  constructor(
    private mapService: MapService,
    private uiState: UiStateService
  ) { }

  ngOnInit(): void { }

  onStartDraw(geometryType: 'Point' | 'LineString' | 'Polygon'): void {
    this.mapService.removeClickInfo();
    this.mapService.removeDrawTool();

    this.drawGeometry = geometryType;
    this.mapService.activateDrawTool(geometryType);

    this.inEditMode = true;
  }

  onEndDraw(): void {
    this.uiState.updateUiState('showMapDrawTool', false);
    this.mapService.removeDrawTool();
    this.mapService.addClickInfo();
  }

  onToggleEditMode(): void {
    this.inEditMode = !this.inEditMode;
  }

  onUndo(): void {
    this.mapService.removeLastDrawPoint();
  }

  onDelete(): void {
    this.mapService.removeDrawTool();
    this.onStartDraw(this.drawGeometry);
  }

  onSave(): void {
    this.mapService.finishDrawing();
    this.mapService.changeLayerStyle('draw', 'style');
  }


}
