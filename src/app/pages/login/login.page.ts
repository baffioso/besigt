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
    private router: Router,
    private userNotificationService: UserNotificationService,
  ) { }

  ngOnInit(): void {
    this.credentials = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  login() {
    this.userNotificationService.presentLoading(null).subscribe();

    this.supabase.signIn(this.credentials.value).then(async () => {
      this.userNotificationService.dismissLoading();
      this.router.navigateByUrl('/app/map', { replaceUrl: true });
    }, async err => {
      this.userNotificationService.dismissLoading();
      this.showError('Login fejlede', err.message);
    });
  }

  async signUp() {
    this.userNotificationService.presentLoading(null).subscribe();

    this.supabase.signUp(this.credentials.value).then(async () => {
      this.userNotificationService.dismissLoading();
      this.router.navigateByUrl('/app/map', { replaceUrl: true });
    }, async err => {
      this.userNotificationService.dismissLoading();
      this.showError('Sign up fejlede', err.message);
    });

  }

  showError(header: string, message: string) {
    this.userNotificationService.presentToast({
      color: 'danger',
      header,
      message,
      duration: 3000,
      position: 'top'
    });
  }

}
