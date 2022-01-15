import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SupabaseService } from '@app/services/supabase.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabsPage {
  userAuthenticated$ = this.supabase.authenticated$;

  constructor(
    private supabase: SupabaseService
  ) { }

}
