import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from '@app/store/app.reducer';
import * as mapToolActions from '@app/components/map-tools/store/map-tool.actions';
import { MapTool } from '@app/components/map-tools/store/map-tool.reducer';

@Component({
  selector: 'app-map-tools',
  templateUrl: './map-tools.component.html',
  styleUrls: ['./map-tools.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapToolsComponent {

  selectedProject$ = this.store.select('project', 'selectedProject');
  activatedMapTools$ = this.store.select('mapTools', 'activatedMapTools');

  constructor(
    private store: Store<AppState>
  ) { }

  activateTool(tool: MapTool) {
    this.store.dispatch(mapToolActions.toggleMapTool({ tool }))
  }

}
