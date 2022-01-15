import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SupabaseService } from 'src/app/services/supabase.service';
import { ProjectStoreService } from 'src/app/stores/project-store.service';

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
    private projectStore: ProjectStoreService
  ) { }

  signOut() {
    this.supabase.signOut();
    this.projectStore.clearProjectState();
  }

}
