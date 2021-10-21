import { Injectable } from '@angular/core';
import { CreateFeature, Properties } from '@app/interfaces/feature';
import { BehaviorSubject, combineLatest, of } from 'rxjs';
import { catchError, filter, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { CreateImage } from '../interfaces/image';
import { Project, ProjectWithRelations } from '../interfaces/project';
import { GeolocationService } from '../services/geolocation.service';
import { MapService } from '../services/map.service';
import { PhotoService } from '../services/photo.service';
import { SupabaseService } from '../services/supabase.service';
import { MapStoreService } from './map-store.service';
import { UiStateService } from './ui-state.service';

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
        // console.log(error);
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
        // console.log(error);
      }

    })
  );

  constructor(
    private readonly supabase: SupabaseService,
    private mapService: MapService,
    private mapStore: MapStoreService,
    private photoService: PhotoService,
    private geolocationService: GeolocationService,
    private uiState: UiStateService
  ) { }

  async loadProjects() {
    const projects = await this.supabase.loadProjects();
    this._projects$.next(projects);
  }

  async addProject(project: Project) {
    const newProject = await this.supabase.addProject(project);
    this.supabase.addMapViewState(newProject[0].id, this.mapStore.viewState);
    this.loadProjects();
  }

  addPhoto() {
    const time = new Date().getTime();
    const fileName = `${time}.png`;

    // Upload image state
    this.uiState.updateUiState('uploadingImage', true);

    // Upload image to supabase and return path
    const storagePath$ = this.photoService.takePhoto().pipe(
      switchMap(photo => this.photoService.photoToBlob(photo)),
      switchMap(blob => this.supabase.uploadImage(fileName, blob)),
      map(res => res.data.Key)
    );

    // Geo position for taken image
    const position$ = this.geolocationService.getPosition().pipe(
      map(position => {
        const coords = this.mapService.transform([position.coords.longitude, position.coords.latitude]);
        return `POINT(${coords[0]} ${coords[1]})`;
      })
    );

    // Store image info
    return combineLatest([storagePath$, position$]).pipe(
      switchMap(([path, position]: any) => {
        const imageInfo: CreateImage = {
          file_name: path,
          description: null,
          geom: position,
          project_id: this._currentProjectId$.value
        };

        return this.supabase.addImageInfo(imageInfo);
      }),
      tap(() => {
        this.loadProjects();
        this.uiState.updateUiState('uploadingImage', false);
      }),
      catchError(err => {
        this.uiState.updateUiState('uploadingImage', false);
        return of(null);
      })
    );

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
