import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { from, Observable } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor() { }

  takePhoto(): Observable<Photo> {
    return from(
      Camera.getPhoto({
        quality: 70,
        allowEditing: true,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera
      })
    );
  }

  photoToBlob(photo: Photo): Observable<Blob> {
    return fromFetch(photo.webPath).pipe(
      switchMap(photoResponse => photoResponse.blob())
    );
  }


}
