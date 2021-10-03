import { Component } from '@angular/core';
import { SupabaseService } from '@app/services/supabase.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  userAuthenticated$ = this.supabase.authenticated$;

  constructor(
    private supabase: SupabaseService
  ) { }

}
