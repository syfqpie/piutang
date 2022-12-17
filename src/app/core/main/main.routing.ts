import { Routes } from '@angular/router';

import { AddNewComponent } from './add-new/add-new.component';
import { HomeComponent } from './home/home.component';
import { SettingsComponent } from './settings/settings.component';

export const MainRoutes: Routes = [
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'new',
        component: AddNewComponent
    },
    {
        path: 'settings',
        component: SettingsComponent
    }
]