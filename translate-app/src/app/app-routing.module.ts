import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RecentlyAddedComponent} from "./component/recently-added/recently-added.component";
import {SettingsComponent} from "./component/settings/settings.component";
import {LanguageExercisesComponent} from "./component/language-exercises/language-exercises.component";
import {CommonModule} from "@angular/common";
import {AuthComponent} from "./component/auth/auth.component";
import {LoginGuard} from "./service/login.guard";

const routes: Routes = [
  {path: '', redirectTo: 'profile', pathMatch: 'full'},
  {path: 'login', component: AuthComponent},
  {path: 'added', component: RecentlyAddedComponent},
  {path: 'profile', component: SettingsComponent},
  {path: 'exercises', component: LanguageExercisesComponent}
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
    ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
