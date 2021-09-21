import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Project } from '../interfaces/project';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private _projects$ = new BehaviorSubject<Project[]>([]);
  projects$ = this._projects$.asObservable();

  constructor(private readonly supabase: SupabaseService) { }

  async loadProjects() {
    const projects = await this.supabase.loadProjects();
    this._projects$.next(projects);
  }
}
