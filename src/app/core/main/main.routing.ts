import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { SettingsComponent } from './settings/settings.component';

export const MainRoutes: Routes = [
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'settings',
        component: SettingsComponent
    }
]