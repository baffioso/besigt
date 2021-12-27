import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { SupabaseService } from './services/supabase.service';

import { loadProjects } from '@app/state/project.actions';
import { AppState } from './store/app.reducer';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  projects$: any;

  constructor(
    private readonly supabase: SupabaseService,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {

    this.store.dispatch(loadProjects());


    this.supabase.authChanges((event, session) => {
      if (event === 'SIGNED_IN') {
        this.store.dispatch(loadProjects());
      }
    });

  }
}
