/* eslint-disable arrow-body-style */
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { SupabaseService } from '@app/services/supabase.service';
import { forkJoin, Observable } from 'rxjs';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AppState } from '@app/store/app.reducer';
import { Store } from '@ngrx/store';
import { ProjectWithRelations } from '@app/interfaces/project';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.page.html',
  styleUrls: ['./project-detail.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectDetailPage implements OnInit {

  selectedTab: 'detail' | 'photos' | 'map' = 'detail';
  loader: HTMLIonLoadingElement;

  project$: Observable<ProjectWithRelations>;
  photos$: Observable<SafeResourceUrl[]>;

  constructor(
    private route: ActivatedRoute,
    private supabase: SupabaseService,
    private readonly domSanitizer: DomSanitizer,
    private store: Store<AppState>,
  ) { }

  ngOnInit() {
    this.project$ = this.route.paramMap.pipe(
      switchMap(paramMap => {
        return this.store.select('project', 'projects').pipe(
          map(projects => projects.find(project => project.id === paramMap.get('id')))
        );
      })
    );

    this.photos$ = this.project$.pipe(
      map(project => project.images.map(image => image.file_name.replace('images/', ''))),
      switchMap(fileNames => {
        const p = fileNames.map(fileName => this.supabase.downloadImage(fileName));
        return forkJoin(p).pipe(
          map(imageFiles => {
            return imageFiles.map(image => {
              return this.domSanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(image.data));
            });
          })
        );
      })
    );
  }

  onTabChange(event) {
    this.selectedTab = event.detail.value;
  }
}
