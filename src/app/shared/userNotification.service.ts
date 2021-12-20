import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ToastController, ToastOptions } from '@ionic/angular';
import { BehaviorSubject, from, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserNotificationService {

  private loader: HTMLIonLoadingElement;

  constructor(
    public loadingController: LoadingController,
    public toastController: ToastController,
    public alertController: AlertController
  ) { }

  presentLoading(message: string) {
    return from(this.loadingController.create({ message })).pipe(
      tap(loader => {
        this.loader = loader;
        loader.present();
      })
    );
  }

  dismissLoading(): Observable<boolean> {
    if (this.loader) {
      return from(this.loader.dismiss());
    }

    return of(null);
  }

  async presentToast(options: ToastOptions) {
    const toast = await this.toastController.create(options);
    await toast.present();

    return toast;
  }


}
