import { Routes } from '@angular/router';

import { DebtResolver } from 'src/app/shared/handlers/debts/debt.resolver';

import { AddNewDebtComponent } from './add-new-debt/add-new-debt.component';
import { DebtComponent } from './debt/debt.component';
import { HomeComponent } from './home/home.component';
import { SettingsComponent } from './settings/settings.component';

export const MainRoutes: Routes = [
    {
        path: 'entry/:id',
        component: DebtComponent,
        resolve: { DebtResolver },
        data: {
            title: 'Entry'
        }
    },
    {
        path: 'home',
        component: HomeComponent,
        data: {
            title: 'Home'
        }
    },
    {
        path: 'new-entry',
        component: AddNewDebtComponent,
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