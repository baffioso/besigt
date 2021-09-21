import { Component, OnInit } from '@angular/core';
import { StoreService } from './services/store.service';
import { SupabaseService } from './services/supabase.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor(private readonly supabase: SupabaseService, private storeService: StoreService) { }

  ngOnInit(): void {
    this.supabase.authChanges((event, session) => {
      console.log(event, session);
      if (event === 'SIGNED_IN') {
        this.storeService.loadProjects();
      }
    });
  }
}
