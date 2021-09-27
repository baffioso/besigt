import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { CreateImage } from '../interfaces/image';
import { Project, ProjectWithRelations } from '../interfaces/project';
import { GeolocationService } from '../services/geolocation.service';
import { MapService } from '../services/map.service';
import { PhotoService } from '../services/photo.service';
import { SupabaseService } from '../services/supabase.service';
import { MapStoreService } from './map-store.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectStoreService {
  private _projects$ = new BehaviorSubject<ProjectWithRelations[] | Project[]>([]);
  projects$ = this._projects$.asObservable();

  private _currentProject$ = new BehaviorSubject<Project | ProjectWithRelations>(null);
  currentProject$ = this._currentProject$.asObservable();

  currentProjectImageGeoJSON$ = this.currentProject$.pipe(
    filter(project => project !== undefined || (project as ProjectWithRelations).images.length > 0),
    map((project: ProjectWithRelations) => {
      try {
        const features = project.images.map(image => {
          const { geom, ...properties } = image;
          return { type: 'Feature', geometry: geom, properties };
        });

        return {
          type: 'FeatureCollection',
          crs: {
            type: 'name',
            properties: {
              name: 'EPSG:25832',
            },
          },
          features
        };

      } catch (error) {
        console.log(error);
      }

    })
  );

  constructor(
    private readonly supabase: SupabaseService,
    private mapService: MapService,
    private mapStore: MapStoreService,
    private photoService: PhotoService,
    private geolocationService: GeolocationService
  ) { }

  async loadProjects() {
    const projects = await this.supabase.loadProjects();
    this._projects$.next(projects);
  }

  async addProject(project: Project) {
    const newProject = await this.supabase.addProject(project);
    this.supabase.addMapViewState(newProject[0].id, this.mapStore.viewState);
    this.updateProjects(newProject[0]);
    return newProject;
  }

  async addPhoto() {
    const photo = await this.photoService.takePhoto();
    const blob = await fetch(photo.webPath).then(r => r.blob());
    const file = new File([blob], 'myfile', {
      type: blob.type,
    });

    const time = new Date().getTime();
    const fileName = `${time}.png`;
    const path = await this.supabase.uploadImage(fileName, file);

    const postion: [number, number] = await this.geolocationService.getPosition().then(p => [p.coords.longitude, p.coords.latitude]);
    const coords = this.mapService.transform(postion);

    const imageInfo: CreateImage = {
      file_name: path.data.Key,
      description: '',
      geom: `POINT(${coords[0]} ${coords[1]})`,
      project_id: this._currentProject$.value.id
    };

    this.supabase.addImage(imageInfo);
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

  setCurrentProject(projectId: string) {
    const currentProject = this._projects$.value.find(project => project.id = projectId);
    this._currentProject$.next(currentProject);
  }
}
