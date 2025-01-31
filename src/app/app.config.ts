import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http'; 
import { ToastService  } from 'angular-toastify';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    ToastService,
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideHttpClient(withInterceptorsFromDi()) 
  ]
};
