import { Injectable } from '@angular/core';
import { DrawConfig, MapTool, UiState } from '@app/interfaces/ui-state';
import { BehaviorSubject } from 'rxjs';

type ValueOf<T> = T[keyof T];

@Injectable({
  providedIn: 'root'
})
export class UiStateService {

  initialState: UiState = {
    activatedMapTools: [],
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

  updateUiState(prop: keyof UiState, value: ValueOf<UiState>) {
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

  shiftMapTool(tool: MapTool): void {

    const update: UiState = {
      ...this._uiState$.value,
      activatedMapTools: [tool]
    };
    this._uiState$.next(update);
  };

  addMapTool(tool: MapTool): void {
    const update: UiState = {
      ...this._uiState$.value,
      activatedMapTools: [...this._uiState$.value.activatedMapTools, tool]
    };

    this._uiState$.next(update);
  }

  removeMapTool(tool: MapTool): void {
    const update: UiState = {
      ...this._uiState$.value,
      activatedMapTools: this._uiState$.value.activatedMapTools.filter(t => t !== tool)
    };

    this._uiState$.next(update);
  }

  removeAllMapTools(): void {
    const update: UiState = {
      ...this._uiState$.value,
      activatedMapTools: []
    };

    this._uiState$.next(update);
  }

  updateDrawUiState(prop: keyof DrawConfig, value: ValueOf<DrawConfig>) {
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
