import { Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { IdeasComponent } from './ideas/ideas.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { PageHeaderComponent } from './page-header/page-header.component';
import { CreateIdeasComponent } from './create-ideas/create-ideas.component';
import { ViewAllChildComponent } from './view-all-child/view-all-child.component';

export const routes: Routes = [

  {
    path: '',redirectTo: 'login',pathMatch: 'full'
  },

  {
    path: 'login',component: LoginComponent
  },

  {
    path: 'register',component: RegisterComponent
  },

  {
    path: 'home',component: HomeComponent
  },

  {
    path: 'ideas',component: IdeasComponent
  },

  {
    path: 'favorites',component: FavoritesComponent
  },


  {
    path: 'menu',redirectTo: 'home',pathMatch: 'full'
  },

  {
    path:'pageheader',component:PageHeaderComponent
  },
  {
    path:'create-ideas',component:CreateIdeasComponent
  },
  {
    path:'viewall',component:ViewAllChildComponent
  }
  

];