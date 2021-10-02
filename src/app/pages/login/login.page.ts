import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { SupabaseService } from 'src/app/services/supabase.service';
import { UserNotificationService } from 'src/app/shared/userNotification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentials: FormGroup;

  constructor(
    private readonly supabase: SupabaseService,
    private fb: FormBuilder,
    private alertController: AlertController,
    private router: Router,
    private userNotificationService: UserNotificationService,
  ) { }

  ngOnInit(): void {
    this.credentials = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  async login() {
    const loading = await this.userNotificationService.presentLoading(null);

    this.supabase.signIn(this.credentials.value).then(async () => {
      await loading.dismiss();
      this.router.navigateByUrl('/app/map', { replaceUrl: true });
    }, async err => {
      await loading.dismiss();
      this.showError('Login failed', err.message);
    });
  }

  async signUp() {
    const loading = await this.userNotificationService.presentLoading(null);

    const user = await this.supabase.signUp(this.credentials.value);

    if (user) {
      loading.dismiss();
    } else {
      this.showError('Noget gik galt', 'kunner ikke oprette bruger');
      loading.dismiss();
    }

  }

  // async handleLogin(input: string) {
  //   try {
  //     await this.supabase.signIn(input);
  //     alert('Check your email for the login link!');
  //   } catch (error) {
  //     alert(error.error_description || error.message);
  //   } finally {
  //   }
  // }

  async showError(title, msg) {
    const alert = await this.alertController.create({
      header: title,
      message: msg,
      buttons: ['OK'],
    });
    await alert.present();
  }

}
