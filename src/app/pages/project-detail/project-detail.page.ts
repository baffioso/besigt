/* eslint-disable arrow-body-style */
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { ProjectStoreService } from '@app/stores/project-store.service';
import { SupabaseService } from '@app/services/supabase.service';
import { forkJoin, from, of } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { UserNotificationService } from '@app/shared/userNotification.service';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.page.html',
  styleUrls: ['./project-detail.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectDetailPage implements OnInit {

  selectedTab: 'detail' | 'photos' | 'map' = 'detail';
  loader: HTMLIonLoadingElement;

  project$ = this.route.paramMap.pipe(
    switchMap(paramMap => {
      return this.projectStore.projects$.pipe(
        map(projects => projects.find(project => project.id === paramMap.get('id')))
      );
    })
  );

  photos$ = this.project$.pipe(
    tap(async () => {
      // this.loader = await this.notification.presentLoading('Henter billeder...');
    }),
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
    }),
    tap(async () => {
      // this.loader.dismiss();
    })
  );

  constructor(
    private projectStore: ProjectStoreService,
    private route: ActivatedRoute,
    private supabase: SupabaseService,
    private readonly domSanitizer: DomSanitizer,
    private notification: UserNotificationService
  ) { }

  ngOnInit() {
  }

  onTabChange(event) {
    this.selectedTab = event.detail.value;
  }
}
