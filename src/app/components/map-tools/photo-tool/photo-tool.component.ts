import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@app/store/app.reducer';
import * as mapActions from '@app/state/map.actions';
import * as photoActions from '@app/components/map-tools/photo-tool/store/photo.actions';


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
    this.store.dispatch(mapActions.zoomToCurrentPosition());
  }

  onApprovePosition(): void {
    this.store.dispatch(photoActions.photoPosition());
    this.store.dispatch(photoActions.takePhoto());
  }

}
