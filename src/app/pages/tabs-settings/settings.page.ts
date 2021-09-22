import { Component } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { SupabaseService } from 'src/app/services/supabase.service';

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.page.html',
  styleUrls: ['settings.page.scss']
})
export class SettingsPage {
  signedIn$ = this.supabase.session$.pipe(
    map(session => session === undefined || null ? true : false),
    tap(console.log)
  );

  constructor(private supabase: SupabaseService) { }

  signOut() {
    this.supabase.signOut();
  }

}
