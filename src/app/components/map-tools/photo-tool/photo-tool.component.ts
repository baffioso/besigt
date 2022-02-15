import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@app/store/app.reducer';
import { MapActions, MapToolActions, PhotoActions } from '@app/store/action-types';

@Component({
  selector: 'app-photo-tool',
  templateUrl: './photo-tool.component.html',
  styleUrls: ['./photo-tool.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PhotoToolComponent implements OnInit {

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.store.dispatch(MapActions.zoomToCurrentPosition());
  }

  onApprovePosition(): void {
    this.store.dispatch(PhotoActions.photoPosition());
    this.store.dispatch(PhotoActions.takePhoto());
    this.store.dispatch(MapToolActions.removeAllMapTools())
  }

}
