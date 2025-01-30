import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { DetailsComponent } from './details/details.component';


export const routes: Routes = [
    { path: '', component: LandingComponent },
    { path: 'detail/:repoName', component: DetailsComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}