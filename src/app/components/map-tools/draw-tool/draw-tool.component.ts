import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { AppState } from '@app/store/app.reducer';
import { MapService } from '@app/services/map.service';
import { mapStyles } from '@app/shared/mapStyles';
import { DrawActions, MapToolActions } from '@app/store/action-types';

@Component({
  selector: 'app-map-draw-tool',
  templateUrl: './draw-tool.component.html',
  styleUrls: ['./draw-tool.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DrawToolComponent implements OnInit {
  showModal = false;
  featureProperties: FormGroup;
  drawGeometry: 'Point' | 'LineString' | 'Polygon';
  drawConfig$ = this.store.select('drawTool');

  constructor(
    private mapService: MapService,
    private fb: FormBuilder,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.store.dispatch(DrawActions.resetDrawTool());

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


    this.store.dispatch(DrawActions.changeDrawEditMode({
      change: {
        prop: 'inEditMode', value: true
      }
    }))
  }

  onEndDraw(): void {
    this.store.dispatch(MapToolActions.removeMapTool({ tool: 'draw' }))
    this.mapService.removeDrawTool();
    this.mapService.addClickInfo();
  }

  onDisableEditMode(): void {
    this.store.dispatch(DrawActions.changeDrawEditMode({
      change: {
        prop: 'inEditMode', value: false
      }
    }))
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
    this.onDisableEditMode();
    this.showModal = true;
  }

  onAddFeature() {
    this.store.dispatch(DrawActions.addFeature({ properties: this.featureProperties.value }));
    this.showModal = false;
  }
}
