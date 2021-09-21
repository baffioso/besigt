import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { SupabaseService } from 'src/app/services/supabase.service';

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.page.html',
  styleUrls: ['settings.page.scss']
})
export class SettingsPage {
  signedIn$ = this.supabase.session$.pipe(
    map(session => session === null ? true : false)
  );

  constructor(private supabase: SupabaseService) { }

  signOut() {
    this.supabase.signOut();
  }

}
