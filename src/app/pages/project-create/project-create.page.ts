import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MapStoreService } from '@app/stores/map-store.service';
import { SupabaseService } from 'src/app/services/supabase.service';
import { ProjectStoreService } from 'src/app/stores/project-store.service';

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.page.html',
  styleUrls: ['./project-create.page.scss'],
})
export class ProjectCreatePage implements OnInit {
  project: FormGroup;

  constructor(
    private fb: FormBuilder,
    private projectStore: ProjectStoreService,
    private mapStore: MapStoreService,
    private router: Router
  ) { }

  ngOnInit() {
    this.project = this.fb.group({
      name: ['', [Validators.required]],
      description: ['']
    });
  }

  onCreateProject() {
    this.projectStore.addProject(this.project.value);
    this.router.navigateByUrl('/app/projects');

  }

}
