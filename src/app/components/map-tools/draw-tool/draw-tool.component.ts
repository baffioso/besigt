import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { pluck } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { AppState } from '@app/store/app.reducer';
import * as projectActions from '@app/state/project.actions';
import * as mapToolActions from '@app/state/map-tool.actions';

import { MapService } from '@app/services/map.service';
import { mapStyles } from '@app/shared/mapStyles';
import { UiStateService } from '@app/stores/ui-state.service';

@Component({
  selector: 'app-map-draw-tool',
  templateUrl: './draw-tool.component.html',
  styleUrls: ['./draw-tool.component.scss'],
})
export class DrawToolComponent implements OnInit {
  showModal = false;
  featureProperties: FormGroup;
  drawGeometry: 'Point' | 'LineString' | 'Polygon';
  drawUiState$ = this.uiState.uiState$.pipe(
    pluck('drawConfig')
  );

  constructor(
    private mapService: MapService,
    private uiState: UiStateService,
    private fb: FormBuilder,
    private store: Store<AppState>
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
    this.store.dispatch(mapToolActions.removeMapTool({ tool: 'draw' }))
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
    this.showModal = true;
  }

  onCreateFeature() {
    this.store.dispatch(projectActions.addFeature({ properties: this.featureProperties.value }));
    this.showModal = false;
  }
}
