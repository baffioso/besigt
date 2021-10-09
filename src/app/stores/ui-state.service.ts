import { Injectable } from '@angular/core';
import { UiState } from '@app/interfaces/ui-state';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiStateService {

  private _uiState$ = new BehaviorSubject<UiState>({
    showMapDrawTool: false
  });
  uiState$ = this._uiState$.asObservable();

  constructor() { }

  updateUiState(prop: keyof UiState, value: any) {
    const updated = {
      ...this._uiState$.value,
      [prop]: value
    };

    this._uiState$.next(updated);
  }


}
