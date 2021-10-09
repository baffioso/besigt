import { Injectable, Query } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { SupabaseClient, createClient, User, Session, AuthChangeEvent } from '@supabase/supabase-js';
import { environment } from '@env/environment';
import { Credentials } from '@app/interfaces/credentials';
import { CreateImage } from '@app/interfaces/image';
import { ViewState } from '@app/interfaces/map-state';
import { CreateProject, Project, ProjectWithRelations } from '@app/interfaces/project';
import { CreateFeature, Feature } from '@app/interfaces/feature';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;
  private _session$: BehaviorSubject<Session> = new BehaviorSubject(null);
  session$ = this._session$.asObservable();
  authenticated$ = this.session$.pipe(
    map((session: Session) => session?.user.aud === 'authenticated' ? true : false)
  );

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supbaseKey,
      {
        autoRefreshToken: true,
        persistSession: true
      }
    );

    this.loadSession();
  }

  loadSession() {
    const session = this.supabase.auth.session();

    if (session) {
      this._session$.next(session);
    } else {
      this._session$.next(null);
    }
  }


  async signIn(credentials: Credentials) {
    return new Promise(async (resolve, reject) => {

      const { error, session } = await this.supabase.auth.signIn(credentials);

      if (error) {
        reject(error);
      } else {
        this._session$.next(session);
        resolve(session);
      }

    });
  }

  signOut() {
    this.supabase.auth.signOut().then(_ => {
      // Clear up and end all active subscriptions!
      this.supabase.getSubscriptions().map(sub => {
        this.supabase.removeSubscription(sub);
      });
      this._session$.next(null);

      return this.supabase.auth.signOut();
    });
  }

  async signUp(credentials: Credentials) {
    return new Promise(async (resolve, reject) => {

      const { error, session } = await this.supabase.auth.signUp(credentials);

      if (error) {
        reject(error);
      } else {
        this._session$.next(session);
        resolve(session);
      }

    });

  }

  authChanges(callback: (event: AuthChangeEvent, session: Session | null) => void) {
    this.supabase.auth.onAuthStateChange(callback);
  }

  async addProject(project: CreateProject) {
    const newProject = {
      user_id: this._session$.value.user.id,
      ...project
    };
    // You could check for error, minlegth of task is 3 chars!
    const query = await this.supabase.from<Project>('projects').insert(newProject, { returning: 'representation' });
    return query.data;
  }

  async loadProjects(): Promise<ProjectWithRelations[]> {
    const query = await this.supabase
      .from<ProjectWithRelations>('projects')
      .select(`
        *,
        map_state (
          name,
          map_state
        ),
        images (
          id,
          file_name,
          description,
          geom
        ),
        features (
          id,
          geom,
          properties
        )
      `);
    return query.data;
  }

  async addMapViewState(project_id, viewState: ViewState) {
    const newViewState = {
      user_id: this._session$.value.user.id,
      project_id,
      name: 'test',
      map_state: viewState
    };

    const query = await this.supabase
      .from('map_state')
      .insert(newViewState, { returning: 'representation' });
    return query.data;
  }

  async addImageInfo(image: CreateImage) {
    const newImage = {
      user_id: this._session$.value.user.id,
      ...image
    };
    const query = await this.supabase.from('images').insert(newImage, { returning: 'representation' });
    return query.data;
  }

  async addFeature(feature: CreateFeature) {
    const newFeature = {
      user_id: this._session$.value.user.id,
      ...feature
    };

    const query = await this.supabase.from('features').insert(newFeature, { returning: 'representation' });
    return query.data;
  }

  async uploadImage(filePath: string, file: File) {
    return await this.supabase.storage.from('images').upload(filePath, file);
  }

  downloadImage(path: string) {
    return this.supabase.storage.from('images').download(path);
  }

}
