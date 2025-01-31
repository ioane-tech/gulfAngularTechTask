import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { DetailsComponent } from './details/details.component';
import { ErrorPageComponent } from './error-page/error-page.component';


export const routes: Routes = [
    { path: '', component: LandingComponent },
    { path: 'detail/:repoName', component: DetailsComponent },
    { path: '**', component: ErrorPageComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}