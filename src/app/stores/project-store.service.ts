import { Injectable } from '@angular/core';
import { CreateFeature, Properties } from '@app/interfaces/feature';
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import { catchError, concatMap, filter, first, map, mergeMap, shareReplay, switchMap, take, tap } from 'rxjs/operators';
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

  currentProjectAreaGeoJSON$ = this.currentProject$.pipe(
    filter(project => !!project),
    map((project: ProjectWithRelations) => (
      {
        type: 'FeatureCollection',
        crs: {
          type: 'name',
          properties: {
            name: 'EPSG:25832',
          },
        },
        features: [project.geom]
      }
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

  loadProjects() {
    return this.supabase.loadProjects().pipe(
      shareReplay(),
      tap(projects => this._projects$.next(projects))
    );
  }

  addProject(project: Project, geomSource: 'jordstykke' | 'draw' | 'bounds' = 'bounds') {

    let feature: Observable<string>;

    switch (geomSource) {
      case 'jordstykke':
        feature = this.mapStore.selectedFeatureAsWKT$;
        break;
      case 'draw':
        feature = this.mapStore.drawnGeometry$;
        break;
      case 'bounds':
        const extent = this.mapService.getViewExtent();
        feature = of(this.mapService.featureAsWKT(extent, 'EPSG:4326', 'EPSG:25832'));
        break;
      default:
        break;
    }

    feature.pipe(
      tap(console.log),
      first(),
      concatMap(geom => this.supabase.addProject({ ...project, geom })),
      concatMap(proj => this.supabase.addMapViewState(proj[0].id, this.mapStore.viewState)),
      switchMap(() => this.loadProjects())
    ).subscribe();
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
      switchMap(() => this.loadProjects()),
      tap(() => this.uiState.updateUiState('uploadingImage', false)),
      catchError(err => {
        this.uiState.updateUiState('uploadingImage', false);
        return of(null);
      })
    );

  }

  async addFeature(properties: Properties) {
    this.mapStore.drawnGeometry$.pipe(
      take(1),
      switchMap(geom => {
        const feature: CreateFeature = {
          geom,
          project_id: this._currentProjectId$.value,
          properties
        };

        return this.supabase.addFeature(feature);
      }),
      switchMap(() => this.loadProjects())
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
