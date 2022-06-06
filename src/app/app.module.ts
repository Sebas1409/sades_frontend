import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { FmysqlService } from './services/fmysql.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ModalesModule } from './modales/modales.module';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AccesosModule } from './accesos/accesos.module';
import { ControlesService } from './services/controles.service';
import { DashModule } from './dash/dash.module';
import { SharedModule } from './shared/shared.module';
import { PipesModule } from './pipes/pipes.module';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, HttpClientModule, AppRoutingModule, ModalesModule, LoadingBarModule, MatSnackBarModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    BrowserAnimationsModule, AccesosModule, DashModule, RouterModule, SharedModule,
    PipesModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    FmysqlService, ControlesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
