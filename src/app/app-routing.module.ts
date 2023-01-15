import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutAuthComponent } from './layouts/layout-auth/layout-auth.component';
import { LayoutMainComponent } from './layouts/layout-main/layout-main.component';
import { AuthGuard } from './shared/handlers/auth/auth.guard';
import { AuthResolver } from './shared/handlers/auth/auth.resolver';

const routes: Routes = [
  // Default
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: '',
    component: LayoutMainComponent,
    canActivate: [AuthGuard],
    resolve: { AuthResolver },
    children: [
      {
        path: '',
        loadChildren: () => import('./core/main/main.module').then(m => m.MainModule)
      }
    ]
  },
  {
    path: 'auth',
    component: LayoutAuthComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./core/auth/auth.module').then(m => m.AuthModule)
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
