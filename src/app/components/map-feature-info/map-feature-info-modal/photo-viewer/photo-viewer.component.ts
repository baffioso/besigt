import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SupabaseService } from '@app/services/supabase.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-photo-viewer',
  templateUrl: './photo-viewer.component.html',
  styleUrls: ['./photo-viewer.component.css']
})
export class PhotoViewerComponent implements OnInit {
  photoUrl$: Observable<SafeResourceUrl>;

  @Input() set properties(properties: any) {
    const fileName = properties.file_name.replace('images/', '');
    this.photoUrl$ = this.downLoadImage(fileName);
  };

  constructor(
    private supabase: SupabaseService,
    private domSanitizer: DomSanitizer
  ) { }

  ngOnInit() {
  }

  downLoadImage(fileName: string) {
    return this.supabase.downloadImage(fileName).pipe(
      map(image => {
        const webView = this.domSanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(image.data));
        return webView;
      }),
    )
  }

}
