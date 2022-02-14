import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { SupabaseService } from '@app/services/supabase.service';
import { AppState } from '@app/store/app.reducer';
import * as projectActions from '@app/pages/tabs-projects/store/project.actions';

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.page.html',
  styleUrls: ['settings.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsPage {
  authenticated$ = this.supabase.authenticated$;

  constructor(
    private supabase: SupabaseService,
    private store: Store<AppState>
  ) { }

  signOut() {
    this.supabase.signOut();
    this.store.dispatch(projectActions.clearProjectState());
  }

}
