import { Injectable } from '@angular/core';
import { CreateFeature, Properties } from '@app/interfaces/feature';
import { BehaviorSubject } from 'rxjs';
import { filter, map, mergeMap, switchMap, tap } from 'rxjs/operators';
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
  private _projects$ = new BehaviorSubject<ProjectWithRelations[]>([]);
  projects$ = this._projects$.asObservable();

  private _currentProjectId$ = new BehaviorSubject<string>(null);
  currentProjectId$ = this._currentProjectId$.asObservable();

  currentProject$ = this.projects$.pipe(
    mergeMap(projects => this.currentProjectId$.pipe(
      map(id => projects.find(project => project.id === id))
    ))
  );

  currentProjectFeatureGeoJSON$ = this.currentProject$.pipe(
    filter(project => (
      project !== undefined ||
      project !== null ||
      project.images.length > 0
    )
    ),
    map((project: ProjectWithRelations) => {
      try {
        const features = project.features.map(image => {
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

  currentProjectImageGeoJSON$ = this.currentProject$.pipe(
    filter(project => (
      project !== undefined ||
      project !== null ||
      project.images.length > 0
    )
    ),
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
    // this.updateProjects(newProject[0]);
    this.loadProjects();
  }

  async addPhoto() {
    const photo = await this.photoService.takePhoto();
    const blob = await fetch(photo.webPath).then(r => r.blob());
    const time = new Date().getTime();
    const file = new File([blob], time.toString(), {
      type: blob.type,
    });

    const fileName = `${time}.png`;
    const path = await this.supabase.uploadImage(fileName, file);

    const postion: [number, number] = await this.geolocationService.getPosition().then(p => [p.coords.longitude, p.coords.latitude]);
    const coords = this.mapService.transform(postion);

    const imageInfo: CreateImage = {
      file_name: path.data.Key,
      description: null,
      geom: `POINT(${coords[0]} ${coords[1]})`,
      project_id: this._currentProjectId$.value
    };

    await this.supabase.addImageInfo(imageInfo);
    this.loadProjects();

  }

  async addFeature(properties: Properties) {
    this.mapStore.drawnGeometry$.pipe(
      switchMap(geom => {
        const feature: CreateFeature = {
          geom,
          project_id: this._currentProjectId$.value,
          properties
        };

        return this.supabase.addFeature(feature);
      }),
      tap(() => this.loadProjects())
    ).subscribe();
  }

  clearProjectState() {
    this._projects$.next([]);
    this._currentProjectId$.next(null);
    this.mapService.removeProjectOverlays();
  }

  setCurrentProjectId(id: string) {
    this._currentProjectId$.next(id);
  }

  clearCurrentProject(): void {
    this._currentProjectId$.next(null);
    this.mapService.removeProjectOverlays();
  }
}
