import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { SupabaseService } from 'src/app/services/supabase.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  signedIn$ = this.supabase.session$.pipe(
    map(session => session === null ? true : false)
  );

  constructor(private supabase: SupabaseService) { }

  signOut() {
    this.supabase.signOut();
  }

}
