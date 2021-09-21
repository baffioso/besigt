import { Injectable } from '@angular/core';
import { SupabaseClient, createClient, User, Session, AuthChangeEvent } from '@supabase/supabase-js';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Credentials } from '../interfaces/credentials';
import { CreateProject, Project } from '../interfaces/project';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;
  private _session$: BehaviorSubject<Session> = new BehaviorSubject(null);
  session$ = this._session$.asObservable();

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supbaseKey);
  }

  get user() {
    return this.supabase.auth.user();
  }

  get session() {
    return this.supabase.auth.session();
  }

  async signIn(credentials: Credentials) {
    const { user, error, session } = await this.supabase.auth.signIn(credentials);
    if (user) {
      this._session$.next(session);
      return user;
    }

    if (error) {
      console.error(error, credentials);
      return false;
    }

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

  // signOut() {
  //   this._session$.next(null);
  //   return this.supabase.auth.signOut();
  // }

  async signUp(credentials: Credentials) {
    const { user, error, session } = await this.supabase.auth.signUp(credentials);
    if (user) {
      this._session$.next(session);
      return user;
    }

    if (error) {
      console.error(error);
      return false;
    }

  }

  authChanges(callback: (event: AuthChangeEvent, session: Session | null) => void) {
    this.supabase.auth.onAuthStateChange(callback);
  }

  async addProject(project: CreateProject) {
    const newProject = {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      user_id: this._session$.value.user.id,
      ...project
    };
    // You could check for error, minlegth of task is 3 chars!
    const result = await this.supabase.from<Project>('projects').insert(newProject, { returning: 'representation' });
  }

  async loadProjects(): Promise<Project[]> {
    const query = await this.supabase.from<Project>('projects').select('*');
    return query.data;
  }

}
