import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { SupabaseService } from 'src/app/services/supabase.service';

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.page.html',
  styleUrls: ['./project-create.page.scss'],
})
export class ProjectCreatePage implements OnInit {
  project: FormGroup;

  constructor(
    private fb: FormBuilder,
    private supabase: SupabaseService,
  ) { }

  ngOnInit() {
    this.project = this.fb.group({
      name: ['', [Validators.required]],
      description: ['']
    });
  }

  onCreateProject() {
    this.supabase.addProject(this.project.value);
  }

}
