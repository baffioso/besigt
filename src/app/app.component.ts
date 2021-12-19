import { Component, OnInit } from '@angular/core';
import { ProjectStoreService } from './stores/project-store.service';
import { SupabaseService } from './services/supabase.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor(private readonly supabase: SupabaseService, private projectStoreService: ProjectStoreService) { }

  ngOnInit(): void {
    this.supabase.authChanges((event, session) => {
      if (event === 'SIGNED_IN') {
        this.projectStoreService.loadProjects().subscribe();
      }
    });
  }
}
