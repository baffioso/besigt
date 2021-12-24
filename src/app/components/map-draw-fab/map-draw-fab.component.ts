import { Component, OnInit } from '@angular/core';
import { UiStateService } from '@app/stores/ui-state.service';
import { pluck } from 'rxjs/operators';

@Component({
  selector: 'app-map-draw-fab',
  templateUrl: './map-draw-fab.component.html',
  styleUrls: ['./map-draw-fab.component.scss'],
})
export class MapDrawFabComponent implements OnInit {
  uiState$ = this.uiState.uiState$;

  constructor(
    private uiState: UiStateService
  ) { }

  ngOnInit() { }

  onActivateDrawTool() {
    this.uiState.shiftMapTool('draw');
  }

}
