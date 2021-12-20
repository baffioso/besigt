import { Injectable } from '@angular/core';
import { DrawConfig, UiState } from '@app/interfaces/ui-state';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiStateService {

  initialState: UiState = {
    showMapDrawTool: false,
    showProjectAreaSelection: false,
    showInfoTool: false,
    uploadingImage: false,
    drawConfig: {
      inEditMode: false,
      showBack: true,
      showDelete: true,
      showSave: true,
      showUndo: true,
    }
  };

  private _uiState$ = new BehaviorSubject<UiState>(this.initialState);
  uiState$ = this._uiState$.asObservable();

  constructor() { }

  updateUiState(prop: keyof UiState, value: boolean) {
    const updated = {
      ...this._uiState$.value,
      [prop]: value
    };

    this._uiState$.next(updated);
  }

  toggleUiState(prop: keyof UiState) {
    const updated = {
      ...this._uiState$.value,
      [prop]: !this._uiState$.value[prop]
    };

    this._uiState$.next(updated);
  }

  updateDrawUiState(prop: keyof DrawConfig, value: boolean) {
    const updated = {
      ...this._uiState$.value,
      drawConfig: {
        ...this._uiState$.value.drawConfig,
        [prop]: value
      }
    };

    this._uiState$.next(updated);
  }

  resetDrawUiState() {
    const updated = {
      ...this._uiState$.value,
      drawConfig: this.initialState.drawConfig
    };
  }
}
