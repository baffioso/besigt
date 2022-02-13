import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouteReuseStrategy } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from '@app/app-routing.module';
import { AppComponent } from '@app/app.component';
import { appReducer } from '@app/store/app.reducer';
import { ProjectEffects } from '@app/state/project.effects';
import { MapEffects } from './state/map.effects';
import { PhotoEffects } from '@app/components/map-tools/photo-tool/store/photo.effects';
import { DrawEffects } from '@app/components/map-tools/draw-tool/store/draw.effects';
import { environment } from '../environments/environment';
import { SaveProjectEffects } from './components/map-tools/save-project/store/save-project.effects';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        IonicModule.forRoot(),
        StoreModule.forRoot(appReducer),
        EffectsModule.forRoot([
            ProjectEffects,
            MapEffects,
            SaveProjectEffects,
            PhotoEffects,
            DrawEffects
        ]),
        StoreDevtoolsModule.instrument({
            maxAge: 25,
            logOnly: environment.production,
            // autoPause: true
        }),
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: environment.production,
            // Register the ServiceWorker as soon as the app is stable
            // or after 30 seconds (whichever comes first).
            registrationStrategy: 'registerWhenStable:30000'
        })],
    providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
    bootstrap: [AppComponent]
})
export class AppModule { }
