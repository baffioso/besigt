import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Project } from '../interfaces/project';
import { SupabaseService } from '../services/supabase.service';
import { MapStoreService } from './map-store.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectStoreService {
  private _projects$ = new BehaviorSubject<Project[]>([]);
  projects$ = this._projects$.asObservable();

  constructor(
    private readonly supabase: SupabaseService,
    private mapStore: MapStoreService
  ) { }

  async loadProjects() {
    const projects = await this.supabase.loadProjects();
    this._projects$.next(projects);
  }

  async addProject(project: Project) {
    const p = await this.supabase.addProject(project);
    this.supabase.addMapViewState(p[0].id, this.mapStore.viewState);
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
