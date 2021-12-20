import { Component, OnInit } from '@angular/core';
import { MapService } from '@app/services/map.service';
import { mapStyles } from '@app/shared/mapStyles';
import { MapStoreService } from '@app/stores/map-store.service';
import { ProjectStoreService } from '@app/stores/project-store.service';
import { UiStateService } from '@app/stores/ui-state.service';
import { ModalController } from '@ionic/angular';
import { from } from 'rxjs';
import { filter, first, map, mergeMap, pluck, takeUntil } from 'rxjs/operators';
import { MapDrawModalComponent } from '../map-draw-modal/map-draw-modal.component';

@Component({
  selector: 'app-map-draw-tool',
  templateUrl: './map-draw-tool.component.html',
  styleUrls: ['./map-draw-tool.component.scss'],
})
export class MapDrawToolComponent implements OnInit {
  // inEditMode = false;
  drawGeometry: 'Point' | 'LineString' | 'Polygon';
  drawUiState$ = this.uiState.uiState$.pipe(
    pluck('drawConfig')
  );

  constructor(
    private modalController: ModalController,
    private mapService: MapService,
    private mapStore: MapStoreService,
    private projectStore: ProjectStoreService,
    private uiState: UiStateService
  ) { }

  ngOnInit(): void {
    this.uiState.resetDrawUiState();
  }

  onStartDraw(geometryType: 'Point' | 'LineString' | 'Polygon'): void {
    this.mapService.removeClickInfo();
    this.mapService.removeDrawTool();

    this.drawGeometry = geometryType;
    this.mapService.activateDrawTool(geometryType);


    this.uiState.updateDrawUiState('inEditMode', true);
  }

  onEndDraw(): void {
    this.uiState.updateUiState('showMapDrawTool', false);
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
      mergeMap(geom => from(this.showDrawModal()).pipe(
        map(description => ({ geom, description }))
      ))
    ).subscribe();
  }

  async showDrawModal(): Promise<string> {
    const modal = await this.modalController.create({
      cssClass: 'bottom-modal',
      component: MapDrawModalComponent,
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();

    if (data) {
      this.projectStore.addFeature({ description: data });
    }


    return data;
  }


}
