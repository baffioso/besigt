
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { SupabaseService } from '@app/services/supabase.service';
import { AppState } from '@app/store/app.reducer';
import { MapService } from '@app/services/map.service';

@Injectable()
export class SaveProjectEffects {



    constructor(
        private actions$: Actions,
        private store: Store<AppState>,
        private mapService: MapService,
        private supabase: SupabaseService
    ) { }
}