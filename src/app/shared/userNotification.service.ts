import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ToastController, ToastOptions } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UserNotificationService {

  constructor(
    public loadingController: LoadingController,
    public toastController: ToastController,
    public alertController: AlertController
  ) { }

  async presentLoading(message: string) {
    const loading = await this.loadingController.create({
      message,
    });
    await loading.present();

    return loading;

  }

  async presentToast(options: ToastOptions) {
    const toast = await this.toastController.create(options);
    await toast.present();

    return toast;
  }


}
