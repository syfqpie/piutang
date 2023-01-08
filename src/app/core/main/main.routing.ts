import { Routes } from '@angular/router';

import { AddNewComponent } from './add-new/add-new.component';
import { HomeComponent } from './home/home.component';
import { SettingsComponent } from './settings/settings.component';

export const MainRoutes: Routes = [
    {
        path: 'home',
        component: HomeComponent,
        data: {
            title: 'Home'
        }
    },
    {
        path: 'new',
        component: AddNewComponent,
        data: {
            title: 'New entry'
        }
    },
    {
        path: 'settings',
        component: SettingsComponent,
        data: {
            title: 'Settings'
        }
    }
]