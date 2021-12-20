import { Component, OnInit } from '@angular/core';
import { UiStateService } from '@app/stores/ui-state.service';

@Component({
  selector: 'app-map-save-project-fab',
  templateUrl: './map-save-project-fab.component.html',
  styleUrls: ['./map-save-project-fab.component.scss'],
})
export class MapSaveProjectFabComponent implements OnInit {

  constructor(
    private uiState: UiStateService
  ) { }

  ngOnInit() { }

  toggleAreaSelection() {
    this.uiState.toggleUiState('showProjectAreaSelection');
  }

}
