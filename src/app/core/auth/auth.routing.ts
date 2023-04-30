import { Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetComponent } from './reset/reset.component';

export const AuthRoutes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        data: {
            title: 'Login'
        }
    },
    {
        path: 'register',
        component: RegisterComponent,
        data: {
            title: 'Register'
        }
    },
    {
        path: 'reset',
        component: ResetComponent,
        data: {
            title: 'Reset'
        }
    },
    { path: '**', redirectTo: 'login' }
]