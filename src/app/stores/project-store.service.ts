import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Project } from '../interfaces/project';
import { SupabaseService } from '../services/supabase.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectStoreService {
  private _projects$ = new BehaviorSubject<Project[]>([]);
  projects$ = this._projects$.asObservable();

  constructor(
    private readonly supabase: SupabaseService
  ) { }

  async loadProjects() {
    const projects = await this.supabase.loadProjects();
    this._projects$.next(projects);
  }

  async addProject(project: Project) {
    const p = await this.supabase.addProject(project);
    this.updateProjects(p[0]);
    return p;
  }

  updateProjects(project: Project) {
    const updates = [
      ...this._projects$.value,
      project
    ];
    this._projects$.next(updates);
  }

  clearProjectState() {
    this._projects$.next([]);
  }
}
