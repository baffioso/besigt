import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { saveAs } from 'file-saver';

import { Image } from '@app/interfaces/image';
import { SupabaseService } from '@app/services/supabase.service';
import { ProjectActions } from '@app/store/action-types';
import { AppState } from '@app/store/app.reducer';


@Component({
  selector: 'app-photo-viewer',
  templateUrl: './photo-viewer.component.html',
  styleUrls: ['./photo-viewer.component.css']
})
export class PhotoViewerComponent implements OnInit {
  photoUrl$: Observable<SafeResourceUrl>;
  photoId: string
  fileName: string
  props: Partial<Image>
  private imageBlob: Blob;

  @Input() set properties(properties: any) {
    this.fileName = properties.file_name.replace('images/', '');
    this.photoUrl$ = this.getImageUrl(this.fileName);
    this.photoId = properties.id;
    this.props = properties;
  };

  constructor(
    private modalCtrl: ModalController,
    private supabase: SupabaseService,
    private domSanitizer: DomSanitizer,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
  }

  getImageUrl(fileName: string) {
    return this.supabase.downloadImage(fileName).pipe(
      tap(res => this.imageBlob = res.data),
      map(image => {
        const webView = this.domSanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(image.data));
        return webView;
      }),
    )
  }

  onDownloadPhoto(): void {
    saveAs(this.imageBlob, this.fileName);
  }


  onDeletePhoto(): void {
    this.store.dispatch(ProjectActions.deletePhoto({ id: this.props.id }));
    this.modalCtrl.dismiss();
  }

}
