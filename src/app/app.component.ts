import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { SupabaseService } from './services/supabase.service';

import { AppState } from './store/app.reducer';
import { ProjectActions } from './store/action-types';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  projects$: any;

  constructor(
    private readonly supabase: SupabaseService,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {

    this.store.dispatch(ProjectActions.loadProjects());


    this.supabase.authChanges((event, session) => {
      if (event === 'SIGNED_IN') {
        this.store.dispatch(ProjectActions.loadProjects());
      }
    });

  }
}
