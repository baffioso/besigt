import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MapService } from '@app/services/map.service';
import { mapStyles } from '@app/shared/mapStyles';
import { MapStoreService } from '@app/stores/map-store.service';
import { ProjectStoreService } from '@app/stores/project-store.service';
import { UiStateService } from '@app/stores/ui-state.service';
import { filter, first, pluck, tap } from 'rxjs/operators';

@Component({
  selector: 'app-map-draw-tool',
  templateUrl: './map-draw-tool.component.html',
  styleUrls: ['./map-draw-tool.component.scss'],
})
export class MapDrawToolComponent implements OnInit {
  showModal = false;
  featureProperties: FormGroup;
  drawGeometry: 'Point' | 'LineString' | 'Polygon';
  drawUiState$ = this.uiState.uiState$.pipe(
    pluck('drawConfig')
  );

  constructor(
    private mapService: MapService,
    private mapStore: MapStoreService,
    private projectStore: ProjectStoreService,
    private uiState: UiStateService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.uiState.resetDrawUiState();

    this.featureProperties = this.fb.group({
      name: ['', [Validators.required]],
      description: ['']
    });
  }

  onStartDraw(geometryType: 'Point' | 'LineString' | 'Polygon'): void {
    this.mapService.removeClickInfo();
    this.mapService.removeDrawTool();

    this.drawGeometry = geometryType;
    this.mapService.activateDrawTool(geometryType);


    this.uiState.updateDrawUiState('inEditMode', true);
  }

  onEndDraw(): void {
    this.uiState.removeAllMapTools();
    this.mapService.removeDrawTool();
    this.mapService.addClickInfo();
  }

  onToggleEditMode(): void {
    this.uiState.updateDrawUiState('inEditMode', false);
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
    this.mapService.changeLayerStyle('draw', mapStyles.default);
    this.mapStore.drawnGeometry$.pipe(
      first(),
      filter(geom => !!geom),
      tap(() => this.showModal = true)
    ).subscribe();
  }

  onCreateFeature() {
    this.showModal = false;
    this.projectStore.addFeature(this.featureProperties.value);
  }
}
